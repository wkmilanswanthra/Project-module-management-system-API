# 🎓 Grade Master – Project Module Management API

![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs) 
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) 
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green)

A **NestJS-based API** to manage **academic project modules**, assessments, and grading workflows for universities or institutes.  
It provides **robust authentication**, **role-based access**, **file uploads**, and **OCR capabilities** for document parsing.

---

## ✨ Features

- **📂 Project & Module Management**  
  Manage academic modules, associate projects, and track progress seamlessly.

- **🔒 Authentication & Authorization**  
  Secure JWT-based authentication with role-specific access control (Admin, Lecturer, Student).

- **📝 Assessment & Grading**  
  CRUD operations for assessments with support for file uploads (reports, grading docs).

- **🖼 OCR & Document Parsing**  
  Integrated `tesseract.js` to extract text from PDFs/images for automated grading.

- **📧 Email Notifications**  
  Send updates and alerts using `nodemailer`.

- **📖 API Documentation**  
  Auto-generated Swagger UI for easy API exploration and testing.

---

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)  
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)  
- **Authentication**: Passport.js + JWT  
- **Utilities**:  
  - `tesseract.js` – OCR functionality  
  - `multer` – File upload handling  
  - `class-validator` – Data validation  
  - `dotenv` – Environment configuration  

---

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+  
- [PostgreSQL](https://www.postgresql.org/)  
- [pnpm](https://pnpm.io/) or `npm`

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/wkmilanswanthra/Project-module-management-system-API.git

cd Project-module-management-system-API

# Install dependencies
npm install
# or
pnpm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=grade_master
JWT_SECRET=your_secret_key
PORT=3000
```

---

▶️ Running the Project
Development Mode
```bash
npm run start:dev
```

---

📚 API Documentation
Swagger documentation is available at:

```bash
http://localhost:3000/api
```
Explore and test endpoints interactively.


---

🗂 Project Structure
```bash
Copy
Edit
src/
 ├── assessment/       # Assessment module (controllers, services, DTOs)
 ├── auth/             # Authentication logic (JWT, guards, strategies)
 ├── common/           # Shared utilities, interceptors, pipes
 ├── modules/          # Project module management logic
 ├── main.ts           # Application entry point
```
