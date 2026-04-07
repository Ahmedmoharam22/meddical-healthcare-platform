import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/Loading';
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const Home = lazy(() => import('./pages/Home'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const About = lazy(() => import('./pages/About'));
const Service = lazy(() => import('./pages/Services'));
const Specialties = lazy(() => import('./pages/Specialties'));
const SpecialtyDetails = lazy(() => import('./pages/SpecialtyDetails'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Blog = lazy(() => import('./pages/Blog'));
const SingleBlog = lazy(() => import('./pages/SingleBlog'));
const Contact = lazy(() => import('./pages/Contact'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute'));
const Login = lazy(() => import('./pages/auth/Login'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const ManageDoctors = lazy(() => import('./pages/admin/ManageDoctors'));
const ManageSpecialties = lazy(() => import('./pages/admin/ManageSpecialties'));
const ManageBlogs = lazy(() => import('./pages/admin/ManageBlogs'));
const ManageAppointments = lazy(() => import('./pages/admin/ManageAppointments'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));
const InteractiveBody = lazy(() => import('./components/InteractiveBody'));
const ManageServices = lazy(() => import('./pages/admin/ManageServices'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const Inventory = lazy(() => import('./pages/admin/Inventory'));
const RegisterAdmin = lazy(() => import('./pages/auth/RegisterAdmin'));
const PharmacyInventory = lazy(() => import('./pages/PharmacyInventory'));
const ManageSchedule = lazy(() => import('./pages/admin/ManageSchedule'));
const PaymentSuccess = lazy(() => import('./pages/payments/PaymentSuccess'));
const PaymentFailed = lazy(() => import('./pages/payments/PaymentFailed'));
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));

function App() {
  return (
   

<Router>
<ScrollToTop />
<Suspense fallback={<Loading className="h-screen flex items-center justify-center bg-white text-primary font-bold" />}>
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

    <Route path="*" element={<NotFound />} />
  </Routes>
</Suspense>
</Router>
  );
}

export default App;
