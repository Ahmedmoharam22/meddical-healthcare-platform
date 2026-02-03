import Hero from '../components/home/Hero';
import FeatureCards from '../components/home/FeatureCards';
import Welcome from '../components/home/Welcome';
import Services from '../components/home/Services';
const Home = () => {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Welcome />
      <Services />
      {/* باقي السكاشن هتيجي هنا */}
      <section className="py-20 text-center">
        <h2 className="text-display-2 text-primary">باقي محتوى الصفحة...</h2>
      </section>
    </>
  );
};

export default Home;