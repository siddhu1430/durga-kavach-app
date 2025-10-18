require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const fetch = require('node-fetch');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path'); // Import the path module

// --- DATABASE, TWILIO, & SENDGRID SETUP ---
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "DurgaKavachDB";
let db;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = '+18313043792';
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// ---

// --- DIALOGFLOW SETUP (DEFINITIVE FIX) ---
const PROJECT_ID = 'sanglisafetybot-qgvp';
let sessionClient;
try {
    const credentialsPath = path.join(__dirname, 'credentials.json');
    sessionClient = new dialogflow.SessionsClient({
        keyFilename: credentialsPath // Tells the client to find and use your credentials file automatically.
    });
    console.log("✅ Dialogflow Client configured to use credentials.json");
} catch (error) {
    console.error("❌ CRITICAL: Could not initialize Dialogflow client. Check if 'credentials.json' is in the root folder and is valid.", error);
    process.exit(1); // Exit if Dialogflow can't be configured
}
// ---

const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));

// --- Connect to MongoDB Function ---
async function connectToMongo() {
    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI not found in .env file. Please check your setup.");
        process.exit(1);
    }
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB Atlas!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
}

// --- API ENDPOINT: DETECT INTENT ---
app.post('/api/detect-intent', async (req, res) => {
    if (!sessionClient) {
         return res.status(500).json({ error: 'Dialogflow client not initialized.', responseText: "Sorry, the chatbot service is offline." });
    }
    const { text, lang } = req.body;
    const sessionId = uuidv4();
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);
    const request = {
        session: sessionPath,
        queryInput: { text: { text: text, languageCode: lang } },
    };
    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        res.json({
            intent: result.intent.displayName,
            responseText: result.fulfillmentText || "Sorry, I'm having trouble understanding right now."
        });
    } catch (error) {
        console.error('Dialogflow Error:', error);
        res.status(500).json({ error: 'Failed to detect intent.', responseText: "Sorry, the chatbot service is currently unavailable." });
    }
});


// --- API ENDPOINT: Send Alert ---
app.post('/api/send-alert', async (req, res) => {
    const { userName, email, phone, location, videoData, emergencyContacts } = req.body;
    
    const emails = emergencyContacts.map(c => c.email).filter(Boolean);
    const phoneNumbers = emergencyContacts.map(c => c.phone).filter(Boolean);

    let emailSent = false;
    let smsSent = false;

    // Send Email via SendGrid
    if (emails.length > 0) {
        const locationUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        const accuracyInfo = location.accuracy ? `<p><b>Accuracy:</b> Within ${Math.round(location.accuracy)} meters.</p>` : '';
        const msg = {
            to: emails,
            from: { email: 'durgakavach.alert@yourdomain.com', name: 'Durga Kavach Alert' }, // IMPORTANT: Use a verified sender in SendGrid
            subject: `[URGENT] SOS Alert from ${userName}`,
            html: `<h3>Emergency SOS Report for ${userName}</h3><p><b>User's Phone:</b> ${phone}</p><p><b>Location:</b> <a href="${locationUrl}">View on Map</a></p>${accuracyInfo}<p>A 90-second video evidence clip is attached.</p>`,
            attachments: videoData ? [{ content: videoData.split('base64,')[1], filename: `evidence-video.webm`, type: 'video/webm', disposition: 'attachment' }] : []
        };
        try {
            await sgMail.send(msg);
            emailSent = true;
        } catch (error) {
            console.error('SendGrid Email Error:', error.response ? error.response.body : error);
        }
    }
    
    // Send SMS via Twilio
    if (phoneNumbers.length > 0) {
        const locationUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        const accuracyInfoSms = location.accuracy ? ` (Accuracy: ~${Math.round(location.accuracy)}m)` : '';
        const smsMessage = `URGENT SOS from ${userName}. Location: ${locationUrl}${accuracyInfoSms}. Contact them or authorities now.`;
        
        const smsPromises = phoneNumbers.map(number => {
             const formattedNumber = number.startsWith('+') ? number : `+${number}`;
             return twilio.messages.create({
                body: smsMessage,
                from: TWILIO_PHONE_NUMBER,
                to: formattedNumber
             }).catch(err => console.error(`Twilio SMS Failed for ${number}:`, err));
        });
        const results = await Promise.all(smsPromises);
        smsSent = results.some(r => r && r.sid);
    }
    
    if (emailSent || smsSent) {
        res.json({ status: 'success', message: 'Alerts sent.' });
    } else {
        res.status(500).json({ status: 'error', message: 'Failed to send any alerts.' });
    }
});


// --- START SERVER ---
connectToMongo().then(() => {
    app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
});

