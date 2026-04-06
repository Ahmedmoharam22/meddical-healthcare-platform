import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import About from './pages/About';
import Service from './pages/Services';
import Specialties from './pages/Specialties';
import SpecialtyDetails from './pages/SpecialtyDetails';
import Doctors from './pages/Doctors';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';
import Contact from './pages/Contact';
import ProtectedRoute from './admin/ProtectedRoute';
import Login from './pages/auth/Login';
import AdminLayout from './components/layout/AdminLayout';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageSpecialties from './pages/admin/ManageSpecialties';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageMessages from './pages/admin/ManageMessages';
import Analytics from './pages/dashboard/Analytics';
import InteractiveBody from './components/InteractiveBody';
import ManageServices from './pages/admin/ManageServices';
import ScrollToTop from './components/common/ScrollToTop';
import NotFound from './pages/NotFound';
import BookAppointment from './pages/BookAppointment';
import Inventory from './pages/admin/Inventory';
import RegisterAdmin from './pages/auth/RegisterAdmin';
import PharmacyInventory from './pages/PharmacyInventory';
import ManageSchedule from './pages/admin/ManageSchedule';
import PaymentSuccess from './pages/payments/PaymentSuccess';
import PaymentFailed from './pages/payments/PaymentFailed';
import DashboardOverview from './pages/admin/DashboardOverview';

function App() {
  return (
   

<Router>
<ScrollToTop />
  <Routes>
    {/* 1. روابط المستخدم العادي (MainLayout) */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/specialties" element={<Specialties />} />
      <Route path="/specialties/:id" element={<SpecialtyDetails />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blog/:id" element={<SingleBlog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-admin" element={<RegisterAdmin />} />
      <Route path="/diagnose" element={<InteractiveBody />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/appointment" element={<BookAppointment />} />
      <Route path="/pharmacy" element={<PharmacyInventory />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />

    </Route>

    {/* 2. روابط الإدارة المحمية (AdminLayout) */}
    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminLayout />}>
        {/* التحويل التلقائي لصفحة الإحصائيات */}
        <Route index element={<Navigate to="dashboard" replace />} />
        {/* صفحة الإحصائيات اللي عملناها */}
        <Route path="dashboard" element={<DashboardOverview />} />
        
        {/* ملحوظة: لو لسه مكرتش باقي الصفحات سيبهم كومنت عشان ميرميش Error */}
        <Route path="doctors" element={<ManageDoctors />} />
        {/* {ManageSpecialties} */}
        <Route path="specialties" element={<ManageSpecialties />} />
        {/* {ManageBlogs} */}
        <Route path="blogs" element={<ManageBlogs />} />
        {/* {ManageAppointments} */}
        <Route path="appointments" element={<ManageAppointments />} />
        {/* {ManageMessages} */}
        <Route path="messages" element={<ManageMessages />} />
        {/* {Analytics} */}
        <Route path="stats" element={<Analytics />} />
        {/* {ManageServices} */}
        <Route path="services" element={<ManageServices />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="schedule" element={<ManageSchedule />} />
     
      </Route>
    </Route>

    {/* صفحة 404 (اختياري) */}
    <Route path="*" element={<div>404 - الصفحة غير موجودة</div>} />
  </Routes>
</Router>
  );
}

export default App;
