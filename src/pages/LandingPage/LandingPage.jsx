import LandingNav from "../../components/LandingNav/LandingNav";
import LandingHeroMain from "../../components/LandingHero/LandingHeroMain";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <LandingNav />
      <LandingHeroMain />
      <About />
      <Features />
      <Footer />
    </>
  );
};

export default LandingPage;
