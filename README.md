# Smart Hostel Management System 🏨

A full-stack **Smart Hostel Management System** built with **React (Vite)** and **Firebase**, managing rooms, tenants, payments, notices, complaints, and admins in one real-time platform. Suitable for academic, portfolio, or practical use.

---

## Table of Contents
- [Features](#features)
- [Demo Credentials](#demo-credentials)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [How to Run](#how-to-run)
- [Author](#author)
- [License](#license)

---

## Features
- **Authentication:** Firebase Email & Password Auth, Admin-only dashboard, secure login & logout, user registration
- **Room Management:** Add/edit/delete rooms, auto-updates status, prevents double booking
- **Tenant Management:** Add/edit/delete tenants, assign available rooms, real-time Firestore updates
- **Payment Management:** Track payments, pending/paid status, linked with tenant & room
- **Notice Management:** Create/edit/delete notices, visible to tenants
- **Complaints / Inquiries:** Tenants submit complaints, admin manages status
- **Admin Management:** Add/delete admins, secure roles in Firestore

---

## Demo Credentials

### Admin
- Email: `admin@gmail.com`
- Password: `123456`

### User / Tenant
- Email: `pasindu@gmail.com`
- Password: `123456`

> Users can also register via the registration page.

---

## Tech Stack
- **Frontend:** React (Vite), React Router DOM, Tailwind CSS / Custom CSS, React Icons  
- **Backend / Services:** Firebase Authentication, Firebase Firestore (Realtime Database)

---

## Screenshots

Screenshots are in `Scrrenshots/` folder. Use the correct relative paths:

### Home & Pages
| ![Home](Scrrenshots/Hompe_page.jpg) | ![About](Scrrenshots/About_us.jpg) | ![Services](Scrrenshots/Services.jpg) | ![Register](Scrrenshots/Register.jpg) |
|------------------------------------|----------------------------------|------------------------------------|----------------------------------|
| Home Page | About Us | Services | Register Page |

### Users & Rooms
| ![Tenants](Scrrenshots/Tenants.jpg) | ![Rooms](Scrrenshots/rooms.jpg) | ![Login](Scrrenshots/login.jpg) |
|------------------------------------|-------------------------------|-------------------------------|
| Tenants | Rooms | Login Page |

### Admin Dashboard
| ![Dashboard](Scrrenshots/Dashboard.jpg) | ![Add Admin](Scrrenshots/addAdmin.jpg) | ![Manage Rooms](Scrrenshots/ManageRooms.jpg) | ![Manage Tenants](Scrrenshots/ManageTenants.jpg) |
|----------------------------------------|-------------------------------------|----------------------------------------|-----------------------------------------|
| Dashboard | Add Admin | Manage Rooms | Manage Tenants |

### Management Pages
| ![Manage Payments](Scrrenshots/ManagePayments.jpg) | ![Manage Notices](Scrrenshots/ManageNotices.jpg) | ![Manage Inquiries](Scrrenshots/ManageInquiries.jpg) | ![Complaints](Scrrenshots/Complaints.jpg) |
|----------------------------------------------------|-----------------------------------------------|------------------------------------------------|------------------------------------------|
| Payments | Notices | Inquiries | Complaints |

> **Tip:** GitHub auto-scales images. Click on thumbnails to see full-size.

---

## How to Run

1. **Clone the repository**
```bash
git clone https://github.com/pasinduhimasha/Smart-Hostel-Management-System.git
cd smart-hostel-management-system
Install dependencies

npm install
Configure Firebase

Set up your Firebase project

Update firebaseConfig.js or .env with your Firebase credentials

Run the app

npm run dev
Author
Pasindu Himasha – Student Project, Smart Hostel Management System

License
This project is developed for educational purposes.
