# Smart Kade 🍽️

**Smart Kade** is a modern online food ordering web application built with **React.js (Vite)**, **Node.js**, and **MongoDB (local)**. Users can browse and search the menu, filter by categories, view today’s offers, place orders, and download detailed bills. Admins can securely manage menu items by adding, updating, or deleting dishes. :contentReference[oaicite:3]{index=3}

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Demo Credentials](#demo-credentials)
- [Setup Instructions](#setup-instructions)
- [Author](#author)
- [License](#license)

---

## Features
- Browse the full menu with category filters and search functionality  
- View today’s special offers  
- User accounts: place orders and download detailed bills  
- Admin panel: add, update, or delete menu items  
- Responsive design for desktop and mobile :contentReference[oaicite:4]{index=4}

---

## Tech Stack
- **Frontend:** React.js (Vite)  
- **Backend:** Node.js with Express  
- **Database:** MongoDB (local)  
- **Authentication:** JWT-based secure login  
- **Styling:** CSS / Tailwind / React components :contentReference[oaicite:5]{index=5}

---

## Screenshots

Below are thumbnails of the app UI. Click to see full‑size images. (All screenshots are located in the `smart-kade-api/screenshots/` folder.) :contentReference[oaicite:6]{index=6}

### Main Screens
| Home | About | Why Choose Us | Admin Login |
|------|-------|---------------|-------------|
| ![Home](smart-kade-api/screenshots/Home.jpg) | ![About](smart-kade-api/screenshots/About.jpg) | ![WhyChooseUs](smart-kade-api/screenshots/WhyChooseUs.jpg) | ![AdminLogin](smart-kade-api/screenshots/AdminLogin.jpg) |

### Auth Screens
| User Login | Register |
|------------|----------|
| ![Login](smart-kade-api/screenshots/login.jpg) | ![Register](smart-kade-api/screenshots/Register.jpg) |

### App Usage
| Menu | Manage Items | Add Item | Add Offer |
|------|--------------|----------|-----------|
| ![Menu](smart-kade-api/screenshots/Menu.jpg) | ![ManageItems](smart-kade-api/screenshots/manageitems.jpg) | ![AddItem](smart-kade-api/screenshots/Additeam.jpg) | ![AddOffer](smart-kade-api/screenshots/addoffer.jpg) |

### Order Bill
| Bill |
|------|
| ![Bill](smart-kade-api/screenshots/bill.jpg) | :contentReference[oaicite:7]{index=7}

> 📝 GitHub auto‑scales thumbnail images — clicking them opens the full version.

---

## Demo Credentials

### User
- Email: `pasindu@gmail.com`  
- Password: `123456` :contentReference[oaicite:8]{index=8}

### Admin
- Email: `admin@gmail.com`  
- Password: `123456` :contentReference[oaicite:9]{index=9}

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/pasinduhimasha/Smart-Kade.git
cd Smart-Kade
Backend Setup

cd smart-kade-api
npm install
Make sure MongoDB is running locally

Configure .env (e.g., PORT, DB_URI, JWT_SECRET)

cd smart-kade-frontend
npm install
npm run dev
Open the app

User: http://localhost:5173 (default Vite port)

Admin login via the admin panel

Author
Pasindu Himasha — Student & full‑stack developer. 

License
This project is created for educational and portfolio purposes — feel free to explore and improve it. 
