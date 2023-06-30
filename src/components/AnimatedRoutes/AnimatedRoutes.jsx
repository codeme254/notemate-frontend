import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../../pages/LandingPage/LandingPage";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";
import HomeFeed from "../../pages/HomeFeed/HomeFeed";
import Temp from "../../pages/Temp/Temp";
import Community from "../../pages/Community/Community";
import ExploreNotes from "../../pages/ExploreNotes/ExploreNotes";
import Studio from "../../pages/Studio/Studio";
import UserNotes from "../../pages/UserNotes/UserNotes";
import UserAccount from "../../pages/UserAccount/UserAccount";
import NotePage from "../../pages/NotePage/NotePage";
import { AnimatePresence } from "framer-motion";
import UpdateNote from "../../pages/UpdateNote/UpdateNote";
import Favorites from "../../pages/Favorites/Favorites";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/feed" element={<HomeFeed />} />
        <Route path="/community" element={<Community />} />
        <Route path="/explore-notes" element={<ExploreNotes />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/my-notes" element={<UserNotes />} />
        <Route path="/my-account" element={<UserAccount />} />
        <Route path="/read/:notes_id" element={<NotePage />} />
        <Route path="/update/:notes_id" element={<UpdateNote />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
