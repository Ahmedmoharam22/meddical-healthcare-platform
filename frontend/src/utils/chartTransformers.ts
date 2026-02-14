export const transformSpecialtyData = (data: any[]) => 
  data.map(item => ({ name: item._id, value: item.count }));

export const transformStatusData = (data: any[]) => 
  data.map(item => ({
    name: item._id === 'confirmed' ? 'مؤكد' : item._id === 'cancelled' ? 'ملغي' : 'انتظار',
    value: item.count,
    color: item._id === 'confirmed' ? '#10B981' : item._id === 'cancelled' ? '#EF4444' : '#F59E0B'
  }));