import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Stethoscope, ChevronLeft, MapPin, Loader2, AlertTriangle } from 'lucide-react';
import { useBodyDiagnostics } from '../hooks/useBodyDiagnostics';

const InteractiveBody = () => { 
  const [activePart, setActivePart] = useState<string | null>(null);
  
  const { data: medicalData, isLoading, isError, refetch } = useBodyDiagnostics();

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="text-slate-500 font-bold animate-pulse">جاري فحص الأنظمة الطبية...</p>
    </div>
  );

  if (isError) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500" />
      <h3 className="text-xl font-black text-slate-800">خطأ في الاتصال بالسيرفر</h3>
      <button 
        onClick={() => refetch()} 
        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        إعادة المحاولة
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-cairo" dir="rtl">
      <div className="grid lg:grid-cols-2 gap-12 items-center bg-white p-10 rounded-[50px] shadow-2xl">
        
        {/* SVG Section */}
        <div className="bg-slate-50 rounded-[40px] p-8 flex justify-center">
          <svg viewBox="0 0 200 600" className="h-[550px] w-auto drop-shadow-2xl">
            {/* مثال: الرأس */}
            <motion.path
              d="M100,20 c-15,0 -25,10 -25,25 s10,25 25,25 s25,-10 25,-25 s-10,-25 -25,-25"
              fill={activePart === 'head' ? '#2563eb' : '#cbd5e1'}
              whileHover={{ scale: 1.1, fill: '#3b82f6' }}
              onClick={() => setActivePart('head')}
              className="cursor-pointer transition-colors duration-200"
            />
            {/* باقي الجسم يكمل بنفس النمط... */}
          </svg>
        </div>

        {/* Info Section */}
        <div className="relative min-h-[450px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activePart && medicalData?.[activePart] ? (
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
                    {medicalData[activePart].labelAr}
                  </h2>
                </div>

                <div className="grid gap-3">
                  {medicalData[activePart].commonConditions.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700"
                    >
                      {item.symptom}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-slate-900 rounded-[30px] text-white flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">العيادة المختصة:</p>
                    <h3 className="text-xl font-black text-blue-400">
                      {medicalData[activePart].specialty?.name || "العيادة العامة"}
                    </h3>
                  </div>
                  <button className="bg-blue-600 p-4 rounded-2xl hover:bg-blue-500 transition-colors">
                    <ChevronLeft size={24} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-40">
                <Activity size={80} className="mx-auto mb-4" />
                <p className="text-xl font-bold">اختر منطقة الألم من المجسم</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBody;