import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import AdminQuickBar from '../AdminQuickBar';
import WhatsAppButton from '../WhatsAppButton';



const MainLayout: React.FC = () => {
 

  return (
    <div className="min-h-screen  flex flex-col font-work">
      <Toaster position="top-center" reverseOrder={false} />
      <AdminQuickBar  />
      <Navbar />
      <main className={`grow`}>
        <Outlet /> 
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;