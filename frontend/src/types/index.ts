export interface SymptomDetail {
  symptom: string;
  recommendation: string;
}
export interface Specialty {
  _id: string;
  name: string;
  icon?: string;
  description?: string;
  slug?: string;
}

export interface Doctor {
  _id: string;
  name: string;
  title: string;
specialty: {
    _id: string;
    name: string;
  } | string; 
bio: string;
image: string;
socialLinks: {
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  isFeatured : boolean;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
 image?: string;
  icon?: string;
  slug?: string;
}

export interface Appointment {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  doctor: Doctor;
  service: Service;
  status: 'pending' | 'confirmed' | 'cancelled';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  content: string;
  image: string;
  category: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}
export interface BodyPartData {
  bodyPart: string;
  labelAr: string;
  commonConditions: SymptomDetail[];
  specialty?: {
    _id: string;
    name: string;
  };
}
export interface MedicineProps {
  medicine: {
    name: string;
    image: string;
    stock: number;
    price: number;
    expiryDate: string;
    category: string;
  };
}


export interface BookingPayload {
  doctorId: string;
  specialtyId: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string | Date;
  paymentMethod: "online" | "on_site";
}


export interface Props {
  doctorId: string;
  specialtyId: string;
  specialtyName: string;
  price: number;
}