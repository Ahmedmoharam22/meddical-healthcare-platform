# 🏥 Meddical - Hospital Management System (API Documentation)

أهلاً يا شباب! ده الـ **Backend** الخاص بمشروع **Meddical**. المشروع مبني بـ **Node.js** و **MongoDB** وجاهز عشان يغذي الـ Figma اللي شغالين عليها بالبيانات الحقيقية.

## 🚀 طريقة التشغيل (Setup)

1. بعد ما تعمل `clone` للمشروع، افتح الـ Terminal واكتب:
```bash
npm install

```


2. عشان تملأ الداتابيز بالبيانات (دكاترة، خدمات، مقالات) زي الفيجما بالظبط، اكتب:
```bash
npm run data:import

```


3. شغل السيرفر:
```bash
npm run dev



*السيرفر هيشتغل على: `http://localhost:5000*`

---

## 🛠 الأقسام المتاحة (API Endpoints)

### 👨‍⚕️ الدكاترة (Doctors)

* **جلب كل الدكاترة:** `GET /api/doctors`
* **جلب دكتور معين:** `GET /api/doctors/:id`

> **ملحوظة:** الداتا بترجع ومعاها الـ `specialty` (التخصص) كامل، تقدر توصل لاسم التخصص من `doctor.specialty.name`.

### 🧪 الخدمات (Services)

* **جلب كل الخدمات:** `GET /api/services`

> **ملحوظة:** كل خدمة فيها `image` و `description` و `slug` عشان زرار الـ **Learn More**.

### 🩺 التخصصات (Specialties)

* **جلب كل التخصصات:** `GET /api/specialties`

> استخدم دي عشان تعمل الـ Filter بتاع الدكاترة أو الـ Dropdown.

### 📅 الحجوزات (Appointments)

* **عمل حجز جديد:** `POST /api/appointments`
* **الشكل المطلوب لإرسال الداتا (Body):**

```json
{
  "patientName": "اسم المريض",
  "patientEmail": "الايميل",
  "patientPhone": "0123456789",
  "doctor": "ID_بتاع_الدكتور",
  "service": "ID_بتاع_الخدمة",
  "appointmentDate": "2024-05-20",
  "appointmentTime": "10:00 AM",
  "message": "رسالة اختيارية"
}

```

### 📰 المدونة والأخبار (Blogs)

* **جلب كل المقالات:** `GET /api/blogs`
* **جلب مقالة بالتفصيل:** `GET /api/blogs/:id`

---

## 📝 ملاحظات للفرونت إند:

1. **الصور:** كل الصور المرجعة هي روابط (URLs) مباشرة، تقدر تحطها في الـ `src` بتاع الـ `<img>` فوراً.
2. **الـ IDs:** أي `_id` بيرجع هو اللي بتستخدمه عشان تجيب تفاصيل (دكتور أو مقالة) أو عشان تعمل حجز.
3. **الـ Loading:** يفضل تعملوا `Loading Spinner` لحد ما الداتا تيجي من الـ API.

---
Figma: https://www.figma.com/design/Ydlv9DWohJ6vgBA7BhFPp6/MEDDICAL---Hospital-website-template--Community-?node-id=147-1781&t=4H9QqpykmhJlczNW-0