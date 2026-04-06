import Hero from '../components/home/Hero';
import FeatureCards from '../components/home/FeatureCards';
import Welcome from '../components/home/Welcome';
import Services from '../components/home/Services';
import Specialties from '../components/home/Specialties';
import Appointment from '../components/home/Appointment';
import Doctors from '../components/home/Doctors';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';
import SEO from '../components/SEO';
import ScheduleSection from '../components/home/ScheduleSection';

const Home = () => {
  return (
    <main>
      <SEO
        title="مجمع النور الطبي - رعاية شاملة بجودة عالية"
        description="مجمع النور الطبي يقدم خدمات طبية متكاملة في المحمودية. أطباء متخصصون، أحدث الأجهزة، ورعاية إنسانية بأسعار مخفضة."
        keywords="مجمع النور الطبي، طب، صحة، محمودية، عيادات، أطباء، خدمات طبية، رعاية صحية"
      />
      <Hero />
      <FeatureCards />
      <Welcome />
      <Specialties />
      <Services />
      <Doctors />
      <ScheduleSection />
      <Blogs />
      <Appointment />
      <Contact />
    </main>
  );
};

export default Home;