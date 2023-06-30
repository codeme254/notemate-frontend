import LinkIcon from "./LinkIcon";
import { UserContext } from "../../Helpers/Context";
import { useContext, useEffect, useState, useRef } from "react";
import "./HomeFeedNav.css";
import { GiRead } from "react-icons/gi";
import { BsPencilSquare, BsFillStarFill, BsPeopleFill } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";
import { RiAccountCircleFill } from "react-icons/ri";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiDomain from "../../utils/utilsDomain";

// http://localhost:8081/users/michaeljohnson
// home-feed-nav__nav-active

const HomeFeedNav = () => {
  const { username, setUsername } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await fetch(`${apiDomain}/profile`, {
        credentials: "include",
        method: "GET",
      });
      const userProfile = await profile.json();
      // console.log(userProfile.username)
      setUsername(userProfile.username);
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
    };
    fetchUserProfile();
  }, []);

  const logoutUser = async () => {
    const response = await fetch(`${apiDomain}/users/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    setUsername(null);
    toast.success(responseData.message);
    navigate("/");
  };

  function handleToggleNav() {
    setShowNav(!showNav);
    if (showNav) {
      navRef.current.classList.add("home-feed-nav__nav-active");
    } else {
      navRef.current.classList.remove("home-feed-nav__nav-active");
    }
  }
  return (
    <header className="home-feed-nav">
      <h2 className="home-feed-nav__logo">NoteMate</h2>
      <nav className="home-feed-nav__nav" ref={navRef}>
        <div className="home-feed-nav__nav--links">
          <LinkIcon to="/explore-notes" label="explore" icon={<GiRead />} />
          <LinkIcon to="/studio" label="new note" icon={<BsPencilSquare />} />
          <LinkIcon to="/my-notes" label="my notes" icon={<FiBookOpen />} />
          <LinkIcon
            to="/my-account"
            label="my account"
            icon={<RiAccountCircleFill />}
          />
          <LinkIcon
            to="/community"
            label="community"
            icon={<BsPeopleFill />}
          />
          <LinkIcon
            to="/favorites"
            label="my favorites"
            icon={<BsFillStarFill />}
          />
        </div>
      </nav>

      <div className="home-feed-nav__user">
        <div className="home-feed__user">
          <div className="home-feed__user--initials">
            {firstName && lastName ? `${firstName[0]}${lastName[0]}` : null}
          </div>
          <p className="home-feed__user--name">{username}</p>
        </div>
        {/* <LinkIcon to=""  label="logout" icon={<GiRead />} /> */}
        <button onClick={logoutUser} className="logout-user-btn">
          Logout
        </button>
      </div>

      <button className="feed-button-toggle" onClick={handleToggleNav}>
        <HiOutlineMenuAlt1 />
      </button>
    </header>
  );
};
export default HomeFeedNav;
