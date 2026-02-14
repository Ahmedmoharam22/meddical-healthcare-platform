// // src/utils/whatsappService.ts

// interface AppointmentData {
//   patientName: string;
//   patientPhone: string;
//   appointmentDate: string | Date;
//   appointmentTime: string;
//   doctor?: { name: string };
// }

// export const sendWhatsAppMessage = (app: AppointmentData) => {
//   // 1. تنظيف الرقم
//   const cleanPhone = app.patientPhone.replace(/\D/g, '');
//   const finalPhone = cleanPhone.startsWith('2') ? cleanPhone : `2${cleanPhone}`;

//   // 2. تنسيق التاريخ
//   const formattedDate = new Date(app.appointmentDate).toLocaleDateString('ar-EG');

//   // 3. صياغة الرسالة (هنا تقدر تعدل براحتك)
//   const message = `*مجمع الشفاء الطبي* 🏥%0A%0A` +
//                   `أهلاً بك يا أستاذ/ة *${app.patientName}* 👋%0A` +
//                   `تم تأكيد موعد حجزك بنجاح مع:%0A` +
//                   `👨‍⚕️ دكتور: *${app.doctor?.name || 'المختص'}*%0A` +
//                   `📅 التاريخ: *${formattedDate}*%0A` +
//                   `🕒 الوقت: *${app.appointmentTime}*%0A%0A` +
//                   `نتمنى لك دوام الصحة والعافية ✨`;

//   // 4. التنفيذ
//   const url = `https://wa.me/${finalPhone}?text=${message}`;
//   window.open(url, '_blank');
// };



// src/utils/whatsappService.ts

type MessageType = 'confirm' | 'remind' | 'cancel';

export const sendWhatsAppMessage = (app: any, type: MessageType = 'confirm') => {
  const phone = app.patientPhone.replace(/\D/g, '');
  const finalPhone = phone.startsWith('2') ? phone : `2${phone}`;

  let body = '';

  // اختيار نص الرسالة بناءً على النوع
  if (type === 'confirm') {
    body = `تم *تأكيد* موعدك بنجاح 👨‍⚕️`;
  } else if (type === 'remind') {
    body = `نذكركم بموعدكم القادم اليوم 🕒`;
  } else if (type === 'cancel') {
    body = `للأسف تم إلغاء الموعد، نشكر تفهمكم ❌`;
  }

  const fullMessage = `*مجمع الشفاء الطبي* 🏥%0A%0A` +
                      `أهلاً ${app.patientName}%0A` +
                      `${body}%0A` +
                      `📅 التاريخ: ${new Date(app.appointmentDate).toLocaleDateString('ar-EG')}`;

  window.open(`https://wa.me/${finalPhone}?text=${fullMessage}`, '_blank');
};