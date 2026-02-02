#  Smart Hostel Management System

A full-stack **Smart Hostel Management System** built using **React** and **Firebase**, designed to manage hostel operations such as rooms, tenants, payments, notices, complaints, and admins in one centralized platform.

This project is suitable for **academic submissions**, **portfolio use**, and **real-world hostel management concepts**.

---

##  Features

###  Authentication
- Firebase Email & Password Authentication
- Admin-only dashboard access
- Secure login & logout
- User registration enabled

###  Room Management
- Add, edit, delete rooms
- Room statuses:
  - Available
  - Occupied
  - Maintenance
- Prevents double room booking
- Status auto-updates based on tenant actions

###  Tenant Management
- Add, edit, delete tenants
- Assign only **available rooms**
- Automatically updates room status
- Real-time Firestore updates

###  Payment Management
- Track tenant payments
- Payment status:
  - Pending
  - Paid
- Linked with tenant & room
- Edit and delete payment records

###  Notice Management
- Create, edit, delete notices
- Notice fields:
  - Title
  - Date
  - Created timestamp
- Notices visible to tenants

###  Complaints / Inquiries
- Tenants submit complaints or inquiries
- Admin can view, update status, and delete
- Stored securely in Firestore

###  Admin Management
- Add and delete admins
- Admin roles stored in Firestore
- Email editing disabled (Firebase Auth limitation)

---

##  Demo Login Credentials

###  Admin Login
- Email: admin@gmail.com
- Password: 123456

###  User / Tenant Login
- Email: pasindu@gmail.com
- Password: 123456

> Users can also register using the registration page.

---

##  Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS / Custom CSS
- React Icons

### Backend / Services
- Firebase Authentication
- Firebase Firestore (Realtime Database)

---

##  About `node_modules`
- The `node_modules` folder is **not included** in this repository.
- It contains all dependencies and is **automatically generated** by running `npm install`.
- Uploading it is not necessary and would make the repository huge.

---

##  How to Run

- Make sure **Node.js** and **npm** are installed on your system.  

- Clone the repository:  
```bash
git clone https://github.com/your-username/smart-hostel-management-system.git
cd smart-hostel-management-system

## Author

**Pasindu Himasha**  
Student Project – smart-hostel-management-system

---

## License

This project is developed for  educational purposes.
