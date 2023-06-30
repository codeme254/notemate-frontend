import LandingHero from "./LandingHero";
import heroImg from "../../assets/note-taking.svg";

// TODO: implement a carousel for the hero section

const LandingHeroMain = () => {
  return (
    <LandingHero
      mainTitle="Securely store and organize your study notes"
      descriptionText="Notetaking is a great way to organize your thoughts, notemate makes it easy to store and organize your notes."
      image={heroImg}
    />
  );
};

export default LandingHeroMain;
