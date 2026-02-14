# 🏥 مجمع النور الطبي - Al-Noor Medical Platform
> منصة متكاملة لإدارة المجمعات الطبية والعيادات، تجمع بين تجربة مستخدم سلسة للمرضى ولوحة تحكم قوية للإدارة.

[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-TanStack-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)

---

## 🌟 نظرة عامة (Project Overview)
مشروع "مجمع النور" هو منصة Full-Stack تهدف لرقمنة الخدمات الطبية. يتيح للمرضى استعراض الخدمات الطبية المتاحة، التعرف على الأطباء، وحجز المواعيد، بينما يوفر للأدمن (الإدارة) لوحة تحكم كاملة لإدارة المحتوى والخدمات بشكل لحظي.

## 🚀 المميزات التقنية (Key Features)

- **🔐 نظام إدارة الصلاحيات (Admin Dashboard):** لوحة تحكم محمية تسمح بإضافة وتعديل وحذف الخدمات الطبية (Full CRUD).
- **📱 تصميم متجاوب (Fully Responsive):** واجهة مستخدم متطورة تعمل بكفاءة على جميع الشاشات (Mobile, Tablet, Desktop).
- **⚡ إدارة الحالة (Server-State Management):** استخدام **React Query** لعمل Caching للبيانات وتقليل طلبات الـ API، مما يوفر سرعة فائقة.
- **🛡️ التحقق من البيانات (Advanced Validation):** ربط **React Hook Form** بـ **Zod** لضمان دقة البيانات المدخلة قبل إرسالها للباك إند.
- **🔗 روابط ديناميكية (Dynamic Routing):** نظام Slugs احترافي لصفحات الخدمات والأطباء متوافق مع محركات البحث (SEO Friendly).
- **🎨 تجربة مستخدم عصرية (Modern UI/UX):** استخدام Tailwind CSS مع Lucide Icons لإنشاء واجهة طبية مريحة وعصرية.

## 🛠️ تقنيات المشروع (Tech Stack)

- **Frontend:** React.js (Vite) & TypeScript.
- **State Management:** TanStack Query (React Query).
- **Forms:** React Hook Form & Zod Validation.
- **Styling:** Tailwind CSS & Framer Motion (Transitions).
- **Icons:** Lucide React.
- **HTTP Client:** Axios (With Interceptors for Auth).

## 📁 هيكلة المشروع (Project Structure)

```text
src/
 ├── components/     # المكونات المشتركة (Navbar, Modals, UI)
 ├── hooks/          # Hooks مخصصة للتعامل مع الـ API (React Query)
 ├── pages/          # الصفحات الأساسية (Home, Services, Admin)
 ├── schemas/        # مخططات Validation باستخدام Zod
 ├── services/       # إعدادات Axios والاتصال بالـ API
 └── types/          # تعريفات TypeScript (Interfaces)