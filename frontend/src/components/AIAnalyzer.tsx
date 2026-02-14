import { useState } from 'react';
import { useSymptomChecker } from '../hooks/useAI';
import { Bot, Stethoscope, AlertTriangle, ArrowLeft } from 'lucide-react';

const AIAnalyzer = () => {
  const [text, setText] = useState('');
  const { mutate, data, isPending } = useSymptomChecker();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-[35px] shadow-xl border border-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Bot size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black text-primary">المساعد الطبي الذكي</h2>
          <p className="text-xs text-gray-400 font-bold">اشرح ما تشعر به وسأوجهك للتخصص الصحيح</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 h-32 resize-none font-bold text-gray-700"
        placeholder="مثال: أشعر بصداع شديد مع دوار منذ الصباح..."
      />

      <button
        onClick={() => mutate(text)}
        disabled={isPending || !text}
        className="w-full mt-4 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all disabled:bg-gray-300 flex justify-center items-center gap-2"
      >
        {isPending ? 'جاري التحليل ذكياً...' : 'تحليل الحالة الآن'}
        <ArrowLeft size={18} />
      </button>

      {data && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 transition-all">
          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="flex items-center gap-2 text-primary font-black mb-2">
              <Stethoscope size={18} /> التشخيص المبدئي المحتمل:
            </h4>
            <p className="text-gray-700 font-bold">{data.possibleCondition}</p>
          </div>

          <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
            <h4 className="font-black text-green-700 mb-1">التخصص المطلوب:</h4>
            <p className="text-green-800 font-black text-lg underline decoration-wavy decoration-green-300">
               {data.specialtyNeeded}
            </p>
          </div>

          <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-2xl text-amber-800 text-xs font-bold">
            <AlertTriangle size={16} className="shrink-0" />
            <p>هذا التحليل بناءً على معطيات الذكاء الاصطناعي، يرجى استشارة الطبيب المختص قبل اتخاذ أي قرار طبي أو تناول أدوية.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyzer;