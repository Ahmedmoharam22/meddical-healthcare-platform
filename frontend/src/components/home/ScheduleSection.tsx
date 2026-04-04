import { useState } from "react";
import { useSchedule } from "../../hooks/useSchedule";
import { Clock, User, Stethoscope, ChevronLeft } from "lucide-react";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState("السبت");
  const { schedules, isLoading, isError } = useSchedule(activeDay);  
  return (
    <section className="py-24 bg-white font-cairo" dir="rtl">
      {/* Header */}
        <SectionHeader
        title="مواعيد العيادات الخارجية"
        subtitle="مواعيد العيادات الخارجية"
        className="mb-16"
        />
        <div className="container mx-auto px-4">
        

        {/* Days Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-8 cursor-pointer py-4 rounded-2xl font-bold transition-all duration-300 ${
                activeDay === day
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "bg-site-bg text-gray-500 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center"><Loading /></div>
        ) : isError ? (
          <div className="text-center text-red-500 font-bold">حدث خطأ أثناء تحميل المواعيد.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schedules?.length > 0 ? (
              schedules.map((item) => (
                <div 
                  key={item._id} 
                  className="group bg-white rounded-[35px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Decorative Icon in Background */}
                  <div className="absolute -top-4 -left-4 text-primary/5 group-hover:text-secondary/10 transition-colors">
                    <Stethoscope size={120} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/20">
                        <img 
                          src={`http://localhost:5000/uploads/${item.doctor.image}`} 
                          alt={item.doctor.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary group-hover:text-secondary transition-colors">
                          {item.doctor.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-bold">
                          {item.doctor.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 bg-site-bg p-4 rounded-2xl">
                        <Clock className="text-secondary" size={20} />
                        <span className="font-bold text-primary">من {item.startTime} إلى {item.endTime}</span>
                      </div>
                    </div>

                    <Link 
                      to={`/appointment`}
                      className="flex items-center justify-between w-full p-4 rounded-2xl bg-primary text-white font-bold group-hover:bg-secondary transition-all"
                    >
                      حجز موعد / تفاصيل
                      <ChevronLeft size={20} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-site-bg rounded-[40px]">
                <p className="text-gray-400 text-xl font-bold">لا يوجد أطباء متاحون في هذا اليوم</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;