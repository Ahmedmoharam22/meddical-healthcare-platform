import { Loader2 } from 'lucide-react';

interface AdminLoaderProps {
  /** Optional descriptive text shown below the spinner. Defaults to "جاري تحميل البيانات..." */
  label?: string;
}

/**
 * Standard full-area loading indicator for admin panel pages.
 * Drop in place of any `if (isLoading)` early return.
 */
const AdminLoader = ({ label = 'جاري تحميل البيانات...' }: AdminLoaderProps) => (
  <div className="flex flex-col items-center justify-center w-full py-32 gap-5 animate-in fade-in duration-300">
    {/* Outer ring */}
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
      <div className="relative w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
        <Loader2 className="animate-spin text-secondary" size={32} strokeWidth={2.5} />
      </div>
    </div>

    {/* Label */}
    <p className="text-primary font-black text-lg animate-pulse tracking-tight">{label}</p>

    {/* Skeleton bars to suggest content is loading */}
    <div className="w-full max-w-lg space-y-3 px-4 mt-2">
      <div className="h-3 bg-gray-100 rounded-full animate-pulse w-full" />
      <div className="h-3 bg-gray-100 rounded-full animate-pulse w-4/5 mx-auto" />
      <div className="h-3 bg-gray-100 rounded-full animate-pulse w-3/5 mx-auto" />
    </div>
  </div>
);

export default AdminLoader;
