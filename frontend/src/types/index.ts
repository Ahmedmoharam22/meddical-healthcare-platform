export interface Specialty {
  _id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface Doctor {
  _id: string;
  name: string;
  title: string;
  specialty: Specialty; // لاحظ إننا عملنا Populate هنا
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
  image: string;
  icon: string;
  slug: string;
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