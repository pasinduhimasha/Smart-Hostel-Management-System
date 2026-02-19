# Smart Hostel Management System 🏨

A full-stack **Smart Hostel Management System** built using **React (Vite)** and **Firebase**, designed to manage hostel operations such as rooms, tenants, payments, notices, complaints, and admins in one centralized platform.

This project is suitable for **academic submissions**, **portfolio use**, and **real-world hostel management concepts**.

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
- **Room Management:** Add/edit/delete rooms, status auto-updates, prevents double booking
- **Tenant Management:** Add/edit/delete tenants, assign available rooms, real-time Firestore updates
- **Payment Management:** Track payments, pending/paid status, linked with tenant & room
- **Notice Management:** Create/edit/delete notices, visible to tenants
- **Complaints / Inquiries:** Tenants submit complaints, admin manages status
- **Admin Management:** Add/delete admins, secure roles in Firestore

---

## Demo Login Credentials

### Admin
- Email: `admin@gmail.com`
- Password: `123456`

### User / Tenant
- Email: `pasindu@gmail.com`
- Password: `123456`

> Users can also register using the registration page.

---

## Tech Stack

**Frontend:** React (Vite), React Router DOM, Tailwind CSS / Custom CSS, React Icons  
**Backend / Services:** Firebase Authentication, Firebase Firestore (Realtime Database)

---

## Screenshots

Click any thumbnail to view full-size. Screenshots are in `Screenshots/`.

### Home & Pages
| ![Home](Screenshots/Hompe_page.jpg) | ![About](Screenshots/About_us.jpg) | ![Services](Screenshots/Services.jpg) | ![Register](Screenshots/Register.jpg) |
|------------------------------------|----------------------------------|------------------------------------|----------------------------------|
| Home Page | About Us | Services | Register Page |

### Users & Rooms
| ![Tenants](Screenshots/Tenants.jpg) | ![Rooms](Screenshots/rooms.jpg) | ![Login](Screenshots/login.jpg) |
|------------------------------------|-------------------------------|-------------------------------|
| Tenants | Rooms | Login Page |

### Admin Dashboard
| ![Dashboard](Screenshots/Dashboard.jpg) | ![Add Admin](Screenshots/addAdmin.jpg) | ![Manage Rooms](Screenshots/ManageRooms.jpg) | ![Manage Tenants](Screenshots/ManageTenants.jpg) |
|----------------------------------------|-------------------------------------|----------------------------------------|-----------------------------------------|
| Dashboard | Add Admin | Manage Rooms | Manage Tenants |

### Management Pages
| ![Manage Payments](Screenshots/ManagePayments.jpg) | ![Manage Notices](Screenshots/ManageNotices.jpg) | ![Manage Inquiries](Screenshots/ManageInquiries.jpg) | ![Complaints](Screenshots/Complaints.jpg) |
|----------------------------------------------------|-----------------------------------------------|------------------------------------------------|------------------------------------------|
| Payments | Notices | Inquiries | Complaints |

> **Tip:** GitHub will auto-scale images. Click on thumbnails to see full-size screenshots.

---

## How to Run

1. **Clone the repository**
```bash
git clone https://github.com/pasinduhimasha/Smart-Hostel-Management-System.git
cd smart-hostel-management-system
Install dependencies

npm install
Run the app

npm run dev
Ensure Node.js and npm are installed

Configure Firebase with your project settings

Author
Pasindu Himasha
Student Project – Smart Hostel Management System

License
This project is developed for educational purposes.

