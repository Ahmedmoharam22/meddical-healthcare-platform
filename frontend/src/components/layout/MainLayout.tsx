import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-work">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;