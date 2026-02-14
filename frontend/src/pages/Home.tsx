import Hero from '../components/home/Hero';
import FeatureCards from '../components/home/FeatureCards';
import Welcome from '../components/home/Welcome';
import Services from '../components/home/Services';
import Specialties from '../components/home/Specialties';
import Appointment from '../components/home/Appointment';
import Doctors from '../components/home/Doctors';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Welcome />
      <Services />
      <Specialties />
      <Doctors />
      <Appointment />
      <Blogs />
      <Contact />
      {/* باقي السكاشن هتيجي هنا */}
      <section className="py-20 text-center">
        <h2 className="text-display-2 text-primary">باقي محتوى الصفحة...</h2>
      </section>
    </>
  );
};

export default Home;