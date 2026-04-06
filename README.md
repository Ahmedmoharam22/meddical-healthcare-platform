# 🏥 مجمع النور الطبي - Al-Noor Medical Platform
> منصة متكاملة لإدارة المجمعات الطبية والعيادات، تجمع بين تجربة مستخدم سلسة للمرضى ولوحة تحكم قوية للإدارة.

[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-TanStack-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)

---

## 🏥 Al-Noor Medical Complex (Healthcare ERP)

An advanced medical management platform designed for high-efficiency clinics and hospitals. 

### 🚀 Core Features:
- **Smart Pharmacy & Logistics:** Real-time inventory tracking with Barcode support and low-stock AI alerts.
- **Advanced Auth:** Multi-role access control with secure administrative "Secret Key" registration.
- **Medical Insights:** Dynamic dashboard for tracking medicine expiration and essential medical assets.
- **Modern UI:** Premium medical-grade design using Tailwind CSS and Lucide-icons.

### 🛠️ Tech Stack:
- **Frontend:** React.js (Vite) & TypeScript.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **State Management:** TanStack Query (React Query).
- **Forms:** React Hook Form & Zod Validation.
- **Styling:** Tailwind CSS & Framer Motion (Transitions).
- **Icons:** Lucide React.
- **Animations:** Framer Motion (Transitions).
- **HTTP Client:** Axios (With Interceptors for Auth).

## 📁 (Project Structure)

```text
src/
 ├── components/     # المكونات المشتركة (Navbar, Modals, UI)
 ├── hooks/          # Hooks مخصصة للتعامل مع الـ API (React Query)
 ├── pages/          # الصفحات الأساسية (Home, Services, Admin)
 ├── schemas/        # مخططات Validation باستخدام Zod
 ├── services/       # إعدادات Axios والاتصال بالـ API
 └── types/          # تعريفات TypeScript (Interfaces)
 