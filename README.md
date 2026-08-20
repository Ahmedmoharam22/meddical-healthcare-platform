# 🏥 Al-Noor Medical Complex — Healthcare ERP Platform

> **An enterprise-grade medical management platform built for high-efficiency clinics and medical complexes, combining smooth patient-facing UX with a powerful admin ERP panel.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-brightgreen?style=for-the-badge&logo=vercel)](https://elnoor-meddical-platform.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_|_Express_|_MongoDB-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-TanStack-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)

---

## 📌 Project Overview

### **The Problem We Solve:**
Healthcare facilities struggle with disconnected software systems, leading to delayed inventory tracking, expired pharmaceuticals, manual tracking errors, and slow administrative workflows.

### **The Solution:**
**Al-Noor Medical Platform** unifies clinic administration, pharmacy operations, and medical insights under one centralized system:
* **Smart Pharmacy & Logistics:** Real-time medicine stock tracking with Barcode scanner integration and automated low-stock/expiration alerts.
* **Role-Based Access Control (RBAC):** Multi-tier authorization protecting administrative actions via secure registration secret keys.
* **Medical Data Insights:** Real-time analytics dashboard tracking medical assets, inventory turnover, and patient/clinic metrics.
* **Reliable Data Pipeline:** Robust form validation powered by Zod and React Hook Form with Axios interceptors handling authenticated API traffic.

---

## 📸 Demo & Screenshots

| **🏥 Platform Landing & Medical Services** | **💊 Pharmacy & Inventory Management Panel** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/3960a84f-c352-42ba-a1ab-1203747dadb5" alt="Medical Platform Home View" width="100%" /> | <img src="https://github.com/user-attachments/assets/035917fe-de31-4325-8ee1-39a9a64fb1a8" alt="Pharmacy and Stock Tracking View" width="100%" /> |

| **⚙️ Admin Dashboard & Medical Insights** |
| :---: |
| <img src="https://github.com/user-attachments/assets/3f52d709-f0f7-4ff3-8f2e-fa55402413d9" alt="Admin Control Center" width="100%" /> |

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend** | React.js (Vite), TypeScript, Tailwind CSS, Framer Motion |
| **State Management** | TanStack Query (React Query) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Form Handling & Validation** | React Hook Form, Zod Schema Validation |
| **HTTP Client & Security** | Axios with Auth Interceptors, JWT, Administrative Secret Keys |
| **Icons & Design System** | Lucide React |

---

## 🌐 Live Application Link

🔗 **Explore Al-Noor Medical Platform Live:** [elnoor-meddical-platform.vercel.app](https://elnoor-meddical-platform.vercel.app/)

---

## 📁 Project Structure

```text
src/
 ├── components/     # Reusable UI components (Navbar, Modals, Tables)
 ├── hooks/          # Custom hooks for asynchronous data fetching (TanStack Query)
 ├── pages/          # Core views (Home, Medical Services, Admin Dashboard)
 ├── schemas/        # Zod validation schemas for forms and payloads
 ├── services/       # Axios client setup, interceptors, and API routes
 └── types/          # Strict TypeScript interfaces and type declarations
