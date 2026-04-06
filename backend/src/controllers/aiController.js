

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
