import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Stethoscope, ChevronLeft, Loader2 } from 'lucide-react';
import { useSymptomChecker } from '../hooks/useAI';
import { Link } from 'react-router-dom';

const bodyPartsDesc: Record<string, string> = {
  head: 'الرأس',
  chest: 'الصدر',
  stomach: 'البطن',
  arms: 'الذراعين',
  legs: 'الساقين'
};

const InteractiveBody = () => { 
  const [activePart, setActivePart] = useState<string | null>(null);
  const [symptomText, setSymptomText] = useState("");
  const [aiResult, setAiResult] = useState<any>(null);

  const { mutateAsync: analyzeSymptom, isPending } = useSymptomChecker();

  const handlePartClick = (part: string) => {
    setActivePart(part);
    setAiResult(null); // Reset when changing part
  };

  const handleAnalyze = async () => {
    if (!symptomText.trim()) return;
    
    try {
      const prompt = `أشعر بألم في ${bodyPartsDesc[activePart || '']}. الأعراض: ${symptomText}`;
      const result = await analyzeSymptom(prompt);
      setAiResult(result);
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-cairo" dir="rtl">
      <div className="grid lg:grid-cols-2 gap-12 items-start bg-white p-10 rounded-[50px] shadow-2xl">
        
        {/* SVG Section */}
        <div className="bg-slate-50 rounded-[40px] p-8 flex justify-center items-center relative overflow-hidden h-[600px]">
          <svg viewBox="0 0 200 600" className="h-full w-auto drop-shadow-xl absolute top-10">
            {/* Head */}
            <motion.path
              d="M75,30 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0"
              fill={activePart === 'head' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.05, fill: '#3b82f6' }}
              onClick={() => handlePartClick('head')}
              className="cursor-pointer transition-colors duration-200"
            />
            {/* Neck (static) */}
            <path d="M90,55 h20 v20 h-20 z" fill="#94a3b8" />
            
            {/* Chest */}
            <motion.path
              d="M70,75 h60 v70 h-60 z"
              fill={activePart === 'chest' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.05, fill: '#3b82f6' }}
              onClick={() => handlePartClick('chest')}
              className="cursor-pointer transition-colors duration-200"
            />

            {/* Stomach */}
            <motion.path
              d="M70,145 h60 v60 h-60 z"
              fill={activePart === 'stomach' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.05, fill: '#3b82f6' }}
              onClick={() => handlePartClick('stomach')}
              className="cursor-pointer transition-colors duration-200"
            />

            {/* Arms - Grouped */}
            <motion.g 
              fill={activePart === 'arms' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.05, fill: '#3b82f6' }}
              onClick={() => handlePartClick('arms')}
              className="cursor-pointer transition-colors duration-200"
            >
              {/* Left Arm */}
              <path d="M40,75 h25 v110 h-25 z" rx="10" />
              {/* Right Arm */}
              <path d="M135,75 h25 v110 h-25 z" rx="10" />
            </motion.g>

            {/* Legs - Grouped */}
            <motion.g 
              fill={activePart === 'legs' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.05, fill: '#3b82f6' }}
              onClick={() => handlePartClick('legs')}
              className="cursor-pointer transition-colors duration-200"
            >
              {/* Left Leg */}
              <path d="M70,205 h25 v150 h-25 z" rx="10" />
              {/* Right Leg */}
              <path d="M105,205 h25 v150 h-25 z" rx="10" />
            </motion.g>
          </svg>
        </div>

        {/* Info Section */}
        <div className="relative min-h-[450px] flex flex-col justify-start pt-10">
          <AnimatePresence mode="wait">
            {activePart ? (
              <motion.div
                key={activePart}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <Stethoscope size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">
                    تشخيص {bodyPartsDesc[activePart]}
                  </h2>
                </div>

                {!aiResult ? (
                  <div className="space-y-4">
                    <p className="text-slate-500 font-bold">بماذا تشعر تحديداً في هذه المنطقة؟</p>
                    <textarea 
                      value={symptomText}
                      onChange={(e) => setSymptomText(e.target.value)}
                      placeholder="صف ألمك بوضوح وتفصيل (مثال: ألم نابض ومستمر مع حرارة...)"
                      className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button 
                      onClick={handleAnalyze}
                      disabled={isPending || !symptomText.trim()}
                      className="w-full py-4 bg-primary text-white cursor-pointer rounded-2xl font-black hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:bg-gray-400"
                    >
                      {isPending ? <Loader2 className="animate-spin" /> : 'فحص بالذكاء الاصطناعي'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                      <h4 className="font-black text-blue-900 mb-2">التشخيص المبدئي</h4>
                      <p className="text-blue-800">{aiResult.possibleCondition}</p>
                    </div>

                    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
                      <h4 className="font-black text-red-900 mb-2">نصيحة سريعة</h4>
                      <p className="text-red-800">{aiResult.advice}</p>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-[30px] text-white flex items-center justify-between shadow-xl">
                      <Link to="/appointment" className="cursor-pointer">
                        <p className="text-slate-400 text-sm mb-1">يُفضل حجز موعد في:</p>
                        <h3 className="text-xl font-black text-blue-400">
                          {aiResult.specialtyNeeded}
                        </h3>
                      </Link>
                      <button onClick={() => {setAiResult(null); setSymptomText("");}} className="bg-blue-600 p-4 rounded-2xl hover:bg-blue-500 transition-colors cursor-pointer" title="إعادة الكشف">
                        <ChevronLeft size={24} />
                      </button>
                    </div>
                  </div>
                )}
                
              </motion.div>
            ) : (
              <div className="text-center opacity-40 mt-20">
                <Activity size={80} className="mx-auto mb-4" />
                <p className="text-2xl font-black">اختر منطقة الألم من المجسم</p>
                <p className="text-slate-500 mt-2 font-bold">وسيقوم الذكاء الاصطناعي بمساعدتك في التشخيص</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBody;