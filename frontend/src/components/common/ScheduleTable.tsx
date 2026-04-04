import { useState } from "react";
import { Trash2, Edit, Loader2 } from "lucide-react";
import { useSchedule } from "../../hooks/useSchedule";
import ConfirmModal from "../shared/ConfirmModal";
import Pagination from "./Pagination";

const ScheduleTable = ({ onEdit }: { onEdit: (item: any) => void }) => {
  const { schedules, isLoading, deleteSchedule, isDeleting } = useSchedule("");  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await deleteSchedule(selectedId);
      setIsModalOpen(false);
      
      // If we delete the last item on the current page, go back one page
      if (currentSchedules.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  // Pagination calculations
  const totalItems = schedules?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = schedules?.slice(startIndex, endIndex) || [];

  return (
    <>
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-right font-cairo">
          <thead className="bg-site-bg/50">
            <tr>
              <th className="p-6 font-black text-primary">الطبيب</th>
              <th className="p-6 font-black text-primary">اليوم / الميعاد</th>
              <th className="p-6 font-black text-primary text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedules?.map((item: any) => (
              <tr key={item._id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-all group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-primary">
                        {item.doctor?.name[0]}
                    </div>
                    <span className="font-bold text-primary">{item.doctor?.name}</span>
                  </div>
                </td>
                <td className="p-6 font-bold text-gray-500">
                  <span className="text-secondary ml-2">{item.day}</span>
                  ({item.startTime} - {item.endTime})
                </td>
                <td className="p-6 flex justify-center gap-3">
                  <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-3 text-blue-500 hover:bg-blue-50 rounded-2xl transition-all cursor-pointer">
                    <Edit size={20} />
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); openDeleteModal(item._id); }} className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />

      {/* الـ Modal بتاعك هنا */}
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="حذف ميعاد من الجدول"
        message="هل أنت متأكد من حذف ميعاد هذا الدكتور؟ سيتم اختفاء الميعاد من الصفحة الرئيسية فوراً."
      />
    </>
  );
};

export default ScheduleTable;