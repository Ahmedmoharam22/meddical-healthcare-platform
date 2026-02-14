import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, Stethoscope, AlertCircle } from 'lucide-react';

// الداتا دي المفروض تيجي من الباك إند مستقبلاً، بس هنثبتها هنا للـ Demo الاحترافي
const bodyData = {
  head: { title: "الرأس والدماغ", symptoms: ["صداع نصفي", "دوار", "طنين أذن"], clinic: "عيادة المخ والأعصاب" },
  chest: { title: "الصدر والقلب", symptoms: ["ضيق تنفس", "أخذة في القلب", "كحة مزمنة"], clinic: "عيادة الصدر والقلب" },
  stomach: { title: "البطن والجهاز الهضمي", symptoms: ["تقلصات", "حموضة", "انتفاخ"], clinic: "عيادة الباطنة" },
  limbs: { title: "الأطراف والعظام", symptoms: ["ألم مفاصل", "تنميل", "كسور"], clinic: "عيادة العظام" }
};

const HumanBody = () => {
  const [activePart, setActivePart] = useState<null | keyof typeof bodyData>(null);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 p-8 bg-white rounded-[40px] shadow-2xl border border-slate-100">
      
      {/* الجزء الأول: رسم الجسم التفاعلي */}
      <div className="w-full lg:w-1/2 flex justify-center bg-slate-50 rounded-3xl p-6 relative">
        <svg viewBox="0 0 200 500" className="h-[500px] w-auto drop-shadow-3xl">
          {/* الرأس */}
          <motion.path
            d="M100,20 c-15,0 -25,10 -25,25 s10,25 25,25 s25,-10 25,-25 s-10,-25 -25,-25"
            fill={activePart === 'head' ? '#3b82f6' : '#cbd5e1'}
            className="cursor-pointer"
            whileHover={{ scale: 1.05, fill: '#60a5fa' }}
            onClick={() => setActivePart('head')}
          />
          {/* الجذع (الصدر والبطن) */}
          <motion.path
            d="M75,80 L125,80 L130,200 L70,200 Z"
            fill={activePart === 'chest' || activePart === 'stomach' ? '#94a3b8' : '#cbd5e1'}
          />
          {/* منطقة الصدر تحديداً */}
          <motion.circle
            cx="100" cy="120" r="30"
            fill={activePart === 'chest' ? '#3b82f6' : 'transparent'}
            stroke={activePart === 'chest' ? 'white' : 'transparent'}
            className="cursor-pointer"
            onClick={() => setActivePart('chest')}
            whileHover={{ r: 35 }}
          />
          {/* منطقة البطن تحديداً */}
          <motion.circle
            cx="100" cy="170" r="25"
            fill={activePart === 'stomach' ? '#3b82f6' : 'transparent'}
            stroke={activePart === 'stomach' ? 'white' : 'transparent'}
            className="cursor-pointer"
            onClick={() => setActivePart('stomach')}
            whileHover={{ r: 30 }}
          />
          {/* الأطراف (تبسيط) */}
          <motion.path
            d="M70,90 L40,200 M130,90 L160,200 M85,200 L80,400 M115,200 L120,400"
            stroke={activePart === 'limbs' ? '#3b82f6' : '#cbd5e1'}
            strokeWidth="20"
            strokeLinecap="round"
            className="cursor-pointer"
            onClick={() => setActivePart('limbs')}
          />
        </svg>
        <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2">
          <Activity size={14} /> اضغط على مكان الألم
        </div>
      </div>

      {/* الجزء الثاني: لوحة التشخيص الذكي */}
      <div className="w-full lg:w-1/2 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activePart ? (
            <motion.div
              key={activePart}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 text-white p-8 rounded-[30px] h-full shadow-2xl relative overflow-hidden"
            >
              {/* زخرفة خلفية */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-black mb-2 text-blue-400 flex items-center gap-3">
                <Stethoscope /> {bodyData[activePart].title}
              </h2>
              <p className="text-slate-400 font-bold mb-8">ما هي الأعراض التي تشعر بها؟</p>

              <div className="grid grid-cols-1 gap-3">
                {bodyData[activePart].symptoms.map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: -10 }}
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-blue-600 rounded-2xl transition-all group"
                  >
                    <span className="font-bold">{s}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>

              <div className="mt-10 p-5 bg-blue-600 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-all">
                <div>
                  <p className="text-xs text-blue-100 font-bold">التوجه المقترح:</p>
                  <p className="text-xl font-black">{bodyData[activePart].clinic}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                   <Activity color="white" />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 border-4 border-dashed border-slate-100 rounded-[40px]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                 <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">ابدأ الفحص الذكي</h3>
              <p className="text-slate-400 font-bold max-w-xs">قم بالضغط على أي جزء في جسم الإنسان الظاهر أمامك لبدء تحليل حالتك الصحية</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HumanBody;