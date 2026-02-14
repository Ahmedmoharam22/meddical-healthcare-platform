// import { API_URL } from '../api/axiosInstance';

// export const getBodyDiagnostics = async () => {
//   const { data } = await API_URL.get('/diagnostics/symptoms');
  
//   // تحويل المصفوفة (Array) لـ Object عشان نعرف ننادي عليها بـ (head, chest..)
//   return data.reduce((acc: any, item: any) => {
//     acc[item.bodyPart] = item; // تأكد أن الحقل في الباك إند اسمه bodyPart
//     return acc;
//   }, {});
// };

// services/bodyService.ts
import { API_URL } from '../api/axiosInstance'; 

export const fetchDiagnostics = async () => {
  // لاحظ هنا: استخدمنا API_URL كـ instance
  const { data } = await API_URL.get('/diagnostics/symptoms');
  
  console.log("📡 Data from Backend:", data); // عشان نتأكد إنها Array

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of symptoms");
  }

  return data.reduce((acc: any, item: any) => {
    acc[item.bodyPart] = item;
    return acc;
  }, {});
};