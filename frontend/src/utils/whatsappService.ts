



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