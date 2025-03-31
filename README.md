# Assignment-IntelliSQR

# Full-Stack Authentication Application

![Demo Screenshot](https://github.com/Mayukh0108/Assignment-IntelliSQR/blob/main/image.png?raw=true)

A full-stack authentication app built with React (TypeScript), Node.js, Prisma, and MongoDB. Implements user registration/login with proper error handling, schema validation, and modern development practices.

## Features
- User login with email/password
- Form validation using Zod + React Hook Form
- API error handling with meaningful user feedback
- MongoDB database integration
- Type-safe API responses

---

## Tech Stack
**Frontend**  
- React 18 + TypeScript
- React Query (Data fetching/caching)
- React Hook Form (Form management)
- Zod (Schema validation)
- Axios (HTTP client)

**Backend**  
- Node.js + Express + TypeScript
- Prisma (ORM)
- MongoDB (Database)
- Bcrypt (Password hashing)
- CORS (Cross-origin security)

---

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/Mayukh0108/Assignment-IntelliSQR.git
cd fullstack-auth-app
```

### 2. Backend Setup & Running
```bash
cd backend
npm install

npx prisma generate
node server.ts
```

### 2. Frontend Setup & Running
```bash
cd frontend
npm install

npm run dev
```
