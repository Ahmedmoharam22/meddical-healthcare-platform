import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Helper logic to show limited page numbers (e.g. max 5 pages visible around current)
  // For simplicity, we show a few pages around the current page
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6" dir="rtl">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`p-2 rounded-xl border border-gray-100 flex items-center justify-center transition-all ${
          currentPage === 1 
            ? "text-gray-300 cursor-not-allowed bg-gray-50" 
            : "text-gray-600 hover:bg-primary hover:text-white cursor-pointer"
        }`}
      >
        <ChevronRight size={20} />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer ${
            currentPage === page
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "border border-gray-100 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-xl border border-gray-100 flex items-center justify-center transition-all ${
          currentPage === totalPages 
            ? "text-gray-300 cursor-not-allowed bg-gray-50" 
            : "text-gray-600 hover:bg-primary hover:text-white cursor-pointer"
        }`}
      >
        <ChevronLeft size={20} />
      </button>
    </div>
  );
};

export default Pagination;
