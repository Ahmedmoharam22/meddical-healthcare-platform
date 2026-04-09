import React, { useState } from 'react';
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
    setAiResult(null);
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
    <div className="w-full max-w-6xl mx-auto p-4 font-sans" dir="rtl">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] shadow-2xl">
        
        {/* SVG Section - الجسم التفاعلي */}
        <div className="bg-slate-50 rounded-[30px] md:rounded-[40px] p-4 md:p-8 flex justify-center items-center relative overflow-hidden h-[500px] md:h-[600px]">
          <svg viewBox="0 0 200 600" className="h-full w-auto drop-shadow-xl absolute top-10">
            {/* Head */}
            <path
              d="M75,30 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0"
              fill={activePart === 'head' ? '#2563eb' : '#cbd5e1'}
              onClick={() => handlePartClick('head')}
              className="cursor-pointer transition-all duration-300 hover:fill-blue-500 origin-center hover:scale-[1.05]"
            />
            {/* Neck */}
            <path d="M90,55 h20 v20 h-20 z" fill="#94a3b8" />
            
            {/* Chest */}
            <path
              d="M70,75 h60 v70 h-60 z"
              fill={activePart === 'chest' ? '#2563eb' : '#cbd5e1'}
              onClick={() => handlePartClick('chest')}
              className="cursor-pointer transition-all duration-300 hover:fill-blue-500 origin-center hover:scale-[1.05]"
            />

            {/* Stomach */}
            <path
              d="M70,145 h60 v60 h-60 z"
              fill={activePart === 'stomach' ? '#2563eb' : '#cbd5e1'}
              onClick={() => handlePartClick('stomach')}
              className="cursor-pointer transition-all duration-300 hover:fill-blue-500 origin-center hover:scale-[1.05]"
            />

            {/* Arms */}
            <g 
              fill={activePart === 'arms' ? '#2563eb' : '#cbd5e1'}
              onClick={() => handlePartClick('arms')}
              className="cursor-pointer group transition-all duration-300"
            >
              <path d="M40,75 h25 v110 h-25 z" rx="10" className="transition-all duration-300 group-hover:fill-blue-500 origin-center group-hover:scale-[1.02]" />
              <path d="M135,75 h25 v110 h-25 z" rx="10" className="transition-all duration-300 group-hover:fill-blue-500 origin-center group-hover:scale-[1.02]" />
            </g>

            {/* Legs */}
            <g 
              fill={activePart === 'legs' ? '#2563eb' : '#cbd5e1'}
              onClick={() => handlePartClick('legs')}
              className="cursor-pointer group transition-all duration-300"
            >
              <path d="M70,205 h25 v150 h-25 z" rx="10" className="transition-all duration-300 group-hover:fill-blue-500 origin-center group-hover:scale-[1.02]" />
              <path d="M105,205 h25 v150 h-25 z" rx="10" className="transition-all duration-300 group-hover:fill-blue-500 origin-center group-hover:scale-[1.02]" />
            </g>
          </svg>
        </div>

        {/* Info Section - التحليل والنتائج */}
        <div className="relative min-h-[400px] flex flex-col justify-start pt-4 lg:pt-10">
          {activePart ? (
            <div 
              key={activePart} 
              className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 md:p-4 bg-blue-100 text-blue-600 rounded-2xl">
                  <Stethoscope size={28} className="md:w-8 md:h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  تشخيص {bodyPartsDesc[activePart]}
                </h2>
              </div>

              {!aiResult ? (
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold">بماذا تشعر تحديداً في هذه المنطقة؟</p>
                  <textarea 
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="صف ألمك بوضوح وتفصيل..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                  <button 
                    onClick={handleAnalyze}
                    disabled={isPending || !symptomText.trim()}
                    className="w-full py-4 bg-blue-600 text-white cursor-pointer rounded-2xl font-black hover:bg-blue-700 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isPending ? <Loader2 className="animate-spin" /> : 'فحص بالذكاء الاصطناعي'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in zoom-in-95 fade-in duration-300">
                  <div className="p-5 md:p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                    <h4 className="font-black text-blue-900 mb-2">التشخيص المبدئي</h4>
                    <p className="text-blue-800 leading-relaxed">{aiResult.possibleCondition}</p>
                  </div>

                  <div className="p-5 md:p-6 bg-red-50 border border-red-100 rounded-2xl">
                    <h4 className="font-black text-red-900 mb-2">نصيحة سريعة</h4>
                    <p className="text-red-800 leading-relaxed">{aiResult.advice}</p>
                  </div>

                  <div className="p-5 md:p-6 bg-slate-900 rounded-[25px] md:rounded-[30px] text-white flex items-center justify-between shadow-xl">
                    <Link to="/appointment" className="cursor-pointer group">
                      <p className="text-slate-400 text-sm mb-1">يُفضل حجز موعد في:</p>
                      <h3 className="text-lg md:text-xl font-black text-blue-400 group-hover:text-blue-300 transition-colors">
                        {aiResult.specialtyNeeded}
                      </h3>
                    </Link>
                    <button 
                      onClick={() => {setAiResult(null); setSymptomText("");}} 
                      className="bg-blue-600 p-3 md:p-4 rounded-2xl hover:bg-blue-500 active:scale-90 transition-all cursor-pointer"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center opacity-40 mt-10 md:mt-20 animate-pulse">
              <Activity size={60} className="md:w-20 md:h-20 mx-auto mb-4" />
              <p className="text-xl md:text-2xl font-black">اختر منطقة الألم من المجسم</p>
              <p className="text-slate-500 mt-2 font-bold">وسيقوم الذكاء الاصطناعي بمساعدتك</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveBody;