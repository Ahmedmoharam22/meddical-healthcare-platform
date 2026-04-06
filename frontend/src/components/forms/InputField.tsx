


const InputField = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="font-bold text-gray-700 mr-1">{label}</label>
    <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 transition-all ${error ? 'border-red-400' : 'border-transparent focus-within:border-secondary'}`}>
      <Icon size={20} className="text-gray-400" />
      <input {...props} className="bg-transparent outline-none w-full font-bold text-primary placeholder:text-gray-300" />
    </div>
    {error && <span className="text-red-500 text-sm font-bold mr-1">{error.message}</span>}
  </div>
);

export default InputField;