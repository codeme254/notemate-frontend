import Feature from "./Feature";
import "./Features.css";
import TitleElement from "../TitleElement/TitleElement";
import {
  MdSecurity,
  MdMoneyOff,
  MdPeople,
  MdShare,
  MdFavorite,
  MdDownload,
  MdSave,
} from "react-icons/md";

const Features = () => {
  return (
    <section className="landing-features" id="features">
      <TitleElement
        subTitle="features of notemate"
        mainTitle="why notemate is the best solution for you"
      />
      <div className="features__container">
        <Feature
          title="Write and save your notes online"
          description="Create and save your study notes online, 
          come back and edit them anytime you want, delete them if you want to"
          icon={<MdSave />}
        />
        <Feature
          title="Security of your study notes"
          description="Safely store and organize 
                    your study notes with us, choose who can 
                    see them and who cannot see them using our public/private fetures"
          icon={<MdSecurity />}
        />

        <Feature
          title="if is 100% free"
          description="Enjoy all the features of notemate for free, 
                    don't worry about paying for anything, no subscription fees, no in-app purchases,
                    and most importantly no ads"
          icon={<MdMoneyOff />}
        />

        <Feature
          title="Share your study notes with your friends"
          description="Share your study notes with your friends and 
                    also get to read summarised study notes by your friends using 
                    our public/private fetures"
          icon={<MdShare />}
        />

        <Feature
          title="Download Interesting study notes"
          description="So you found study notes that you really love, notemate
          allows you to download them and save them on your device for offline use,
          either as PDF or as a text file or RTF file"
          icon={<MdDownload />}
        />
        <Feature
          title="Create your online collection of study notes"
          description="Notemate allows you to add notes that you consider interesting
          to your favorites collection, so you can easily access them later on"
          icon={<MdFavorite />}
        />
      </div>
    </section>
  );
};

export default Features;
