import { useQuery } from '@tanstack/react-query';
import { fetchDiagnostics } from '../services/aiService';

export const useBodyDiagnostics = () => {
  return useQuery({
    queryKey: ['bodyDiagnostics'],
    queryFn: fetchDiagnostics,
    staleTime: 1000 * 60 * 10,
    retry: 1, // كفاية مرة واحدة ريتراي عشان نشوف الخطأ بسرعة
  });
};