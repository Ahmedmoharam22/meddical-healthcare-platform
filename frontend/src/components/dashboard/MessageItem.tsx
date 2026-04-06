import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Props {
  _id: string;
  name: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const MessageItem = ({ _id, name, subject, message, createdAt }: Props) => (
  <Link
    to="/admin/messages"
    className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-2xl transition-all border border-transparent hover:border-gray-100 group"
  >
    <div className="w-12 h-12 bg-white ring-1 ring-gray-100 shadow-sm rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-secondary group-hover:text-white transition-all shrink-0">
      <Mail size={20} />
    </div>
    <div className="min-w-0">
      <p className="font-black text-sm text-primary truncate">{name}</p>
      <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{subject || message}</p>
      <p className="text-[10px] text-secondary font-bold mt-2">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ar })}
      </p>
    </div>
  </Link>
);

export default MessageItem;