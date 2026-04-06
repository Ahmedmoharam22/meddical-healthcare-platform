

const PaymentCard = ({ value, selected, register, title, icon: Icon, description }: any) => (
  <label className={`relative p-6 rounded-[28px] border-2 cursor-pointer transition-all flex flex-col gap-3 flex-1 ${selected === value ? 'border-secondary bg-secondary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
    <input type="radio" value={value} {...register("paymentMethod")} className="hidden" />
    <div className="flex justify-between items-center">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === value ? 'border-secondary' : 'border-gray-300'}`}>
        {selected === value && <div className="w-3 h-3 bg-secondary rounded-full" />}
      </div>
      <Icon size={28} className={selected === value ? 'text-secondary' : 'text-gray-400'} />
    </div>
    <div>
      <p className="font-black text-primary text-lg">{title}</p>
      <p className="text-gray-400 text-sm font-bold">{description}</p>
    </div>
  </label>
);


export default PaymentCard;