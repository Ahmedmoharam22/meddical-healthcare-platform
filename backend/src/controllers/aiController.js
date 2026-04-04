// import { OpenAI } from 'openai';


// export const analyzeSymptoms = async (req, res) => {
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   const { symptoms } = req.body;

//   try {
//     const prompt = `
//       أنت مساعد طبي ذكي لمجمع الشفاء الطبي. 
//       المريض يقول: "${symptoms}".
//       بناءً على ذلك، قم بتحليل الحالة وتقديم:
//       1. تشخيص مبدئي محتمل (مع التأكيد أنه ليس نهائياً).
//       2. التخصص الطبي المناسب الذي يجب زيارته في المركز.
//       3. نصيحة أولية سريعة.
//       اجعل الرد بصيغة JSON كالتالي:
//       {
//         "possibleCondition": "...",
//         "specialtyNeeded": "...",
//         "advice": "..."
//       }
//     `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const result = JSON.parse(response.choices[0].message.content);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: "عذراً، فشل الذكاء الاصطناعي في تحليل الحالة" });
//   }
// };


import { GoogleGenerativeAI } from '@google/generative-ai';

export const analyzeSymptoms = async (req, res) => {
  const { symptoms } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: "API key is missing!" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `أنت طبيب خبير. حلل الشكوى: "${symptoms}". رد بصيغة JSON فقط: {"possibleCondition": "...", "specialtyNeeded": "...", "advice": "..."}`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // تنظيف النص من أي Markdown Blocks
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    
    res.json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("❌ Catch Error:", error.message);
    res.status(500).json({ message: "حدث خطأ في النظام، حاول مرة أخرى", error: error.message });
  }
};
