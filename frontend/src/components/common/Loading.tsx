
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-400px w-full gap-4">
      {/* Outer Spinner */}
      <div className="relative flex items-center justify-center">
        {/* The Animated Ring */}
        <div className="w-16 h-16 border-4 border-accent border-t-secondary rounded-full animate-spin"></div>
        
        {/* Central Pulse Dot */}
        <div className="absolute w-4 h-4 bg-primary rounded-full animate-ping"></div>
      </div>

      {/* Modern Text Animation */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-title text-primary font-bold animate-pulse">
          مجمع النور 
        </h3>
        <p className="text-small text-gray-400 tracking-[0.2em] font-medium">
          جاري التحميل...
        </p>
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute opacity-10 pointer-events-none">
        <div className="w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Loading;