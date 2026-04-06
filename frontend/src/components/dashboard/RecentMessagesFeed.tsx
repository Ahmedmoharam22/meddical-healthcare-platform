import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import MessageItem from './MessageItem';

interface Message {
  _id: string; name: string; subject?: string; message: string; createdAt: string;
}

interface Props { messages: Message[] }

const RecentMessagesFeed = ({ messages }: Props) => (
  <div className="lg:col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 flex flex-col h-[450px]">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-black text-primary">آخر الرسائل</h3>
      <Link to="/admin/messages" className="text-secondary hover:underline transition-all font-black text-xs flex items-center gap-1">
        الكل <ArrowRight size={14} className="rotate-180" />
      </Link>
    </div>
    <div className="flex-1 space-y-5 overflow-y-auto pr-1">
      {messages.length > 0
        ? messages.slice(0, 5).map(msg => <MessageItem key={msg._id} {...msg} />)
        : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare size={48} className="text-gray-100 mb-4" />
            <p className="text-gray-300 font-bold italic">لا توجد رسائل واردة حالياً</p>
          </div>
        )}
    </div>
  </div>
);

export default RecentMessagesFeed;