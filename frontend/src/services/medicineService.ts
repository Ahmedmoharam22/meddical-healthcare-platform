import axios from 'axios';
import { API_URL } from '../api/axiosInstance';



export const getMedicines = async (params = {}) => {
  const response = await axios.get(`${API_URL}/medicines`, { params });
  return response.data;
};

export const addMedicine = async (medicineData: any) => {
  const response = await axios.post(`${API_URL}/medicines`, medicineData);
  return response.data;
};

export const updateStock = async (id: string, quantityChange: number) => {
  const response = await axios.put(`${API_URL}/medicines/${id}/stock`, { quantityChange });
  return response.data;
};

export const deleteMedicine = async (id: string) => {
  const response = await axios.delete(`${API_URL}/medicines/${id}`);
  return response.data;
};