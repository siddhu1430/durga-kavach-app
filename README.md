# 🛡️ Durga Kavach: Her Voice. Her Sterngth. Her Safety.  

<img width="1536" height="1024" alt="durga kavach project banner" src="https://github.com/user-attachments/assets/228521d2-ef3c-46bb-81b2-bc3c305f1a24" />
  

[![Node.js](https://img.shields.io/badge/Backend-Node.js-43853D?logo=node.js&logoColor=white)]()  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&logoColor=white)]()  
[![Dialogflow](https://img.shields.io/badge/NLP-Google%20Dialogflow-FF9800?logo=dialogflow&logoColor=white)]()  
[![Twilio](https://img.shields.io/badge/Communication-Twilio-F22F46?logo=twilio&logoColor=white)]()  
[![SendGrid](https://img.shields.io/badge/Email-SendGrid-1A82E2?logo=sendgrid&logoColor=white)]()  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  

**Durga Kavach** is a full-stack AI-powered safety application designed to provide immediate assistance and gather crucial evidence during emergencies.  
It intelligently detects user intent and automatically dispatches alerts to trusted contacts and authorities — ensuring help reaches fast.  

---

## ✨ Features  

🔹 **One-Tap SOS Alerting:** Instantly sends emergency alerts via Twilio SMS and SendGrid Email.  
🔹 **Real-time Evidence Collection:** Automatically records a 90-second video clip and attaches it to email alerts.  
🔹 **High-Accuracy Location Tracking:** Captures GPS coordinates (latitude, longitude, accuracy).  
🔹 **Intelligent Chatbot (Dialogflow):** Understands natural commands in English and Marathi.  
🔹 **Crime Hotspot Mapping (Leaflet):** Shows crime-prone areas nearby for awareness.  
🔹 **PWA Design:** Works as a web app with offline capabilities.  
🔹 **Multi-Language Support:** Available in **English** and **Marathi**.  

---

## ⚙️ Tech Stack  

| Component | Technology | Role |
|------------|-------------|------|
| **Frontend** | HTML5, CSS3, JavaScript (PWA) | UI, camera & location management |
| **Backend** | Node.js (Express) | API server for alerts & communication |
| **Database** | MongoDB Atlas | Cloud database for users, contacts, logs |
| **AI/NLP** | Google Dialogflow | Natural language understanding |
| **Communication** | Twilio | Sends emergency SMS alerts |
| **Email Alerts** | SendGrid | Sends alert emails with video attachments |

---

## 🚀 Getting Started (Local Setup)

### 🧩 1. Prerequisites  
- Node.js (LTS version)  
- MongoDB Atlas Account  
- Twilio Account (Sender Phone Number)  
- SendGrid Account (Verified Sender Email)  
- Google Cloud/Dialogflow Project (Service Account JSON)  

### 🧠 2. Clone the Repository  
```bash
git clone https://github.com/your-username/durga-kavach.git
cd durga-kavach

### ⚙️ 3. Install Dependencies

npm install express body-parser @sendgrid/mail @google-cloud/dialogflow uuid node-cron nodemon

### 🔐 4. Configure Environment Variables

Create a .env file in your project root and add your credentials:
# 🟢 MongoDB
MONGODB_URI="<YOUR_MONGODB_ATLAS_URI>"

# 🟢 Twilio
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX

# 🟢 SendGrid
SENDGRID_API_KEY="SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"


### 📁 5. Add Dialogflow Credentials
Download credentials.json from your Google Cloud Service Account.

Place it in the root folder (same level as server.js).


###▶️ 6. Run the Application
npm start

The app will be live at http://localhost:3000 🎯


### ☁️ Deployment (Recommended: Render or Railway)
1️⃣ Ensure your server listens on process.env.PORT.
2️⃣ Allow your host IP in MongoDB Atlas Network Access.
3️⃣ Upload your .env and credentials.json as Secrets in your host dashboard.
4️⃣ Deploy your repo directly from GitHub.


###🤝 Contribution

Contributions are welcome! 🚀
Help us improve Durga Kavach — whether it’s a new feature, localization, or bug fix.

# 1. Fork the project
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit changes
git commit -m "Add some AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request



### 📸 Screenshots
<img width="3840" height="1080" alt="image" src="https://github.com/user-attachments/assets/0b487524-35ef-4a31-8547-b54394d2d578" />
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/ce999250-ff85-48f2-b78a-ce911e8c3185" />
🟣 Durga Kavach UI Preview


### 👥 Contributors

👤 Siddhant Sanjay Deshmukh  (Project Lead )
📧 Email: dsiddhant.2006@gmail.com
🔗 LinkedIn: www.linkedin.com/in/siddhantdeshmukh1430

👤 Atharv Rajendra Bangle
📧 Email: atharvbangle0@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/atharv-bangle-4147b4289

👤 Dipali Anil Gatade
📧 Email: gatadedipali@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/dipali-gatade-55562a259

👤 Akhil Siddhanath Mahadik
📧 Email: mahadikakhil359@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/akhil-mahadik-689aaa2a1

 
