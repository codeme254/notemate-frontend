import "./LandingNav.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
const LandingNav = () => {
  const navRef = useRef(null);
  const [navIsActive, setNavIsActive] = useState(false);
  const [icon, setIcon] = useState(null);

  const handleToggleNav = () => {
    setNavIsActive(!navIsActive);
    navIsActive
      ? navRef.current.classList.remove("landing-nav-abs")
      : navRef.current.classList.add("landing-nav-abs");
    navIsActive ? setIcon(AiOutlineCloseCircle) : setIcon(HiOutlineMenuAlt1);
  };
  return (
    <header className="landing-nav__header">
      <h2 className="logo">Notemate</h2>
      <button className="menu-icon" onClick={handleToggleNav}>
        {icon}
      </button>
      <nav className="landing-nav__nav" ref={navRef}>
        <ol className="landing-nav__nav-list">
          <li className="landing-nav__nav-list--item">
            <a href="#home">home</a>
          </li>
          <li className="landing-nav__nav-list--item">
            <a href="#about">about</a>
          </li>
          <li className="landing-nav__nav-list--item">
            <a href="#features">features</a>
          </li>
          <li className="landing-nav__cta">
            <div>
              <Link
                to="/sign-up"
                className="landing-nav__cta-btn landing-nav__cta-btn-pri"
              >
                sign up (free)
              </Link>
              <Link
                to="/login"
                className="landing-nav__cta-btn landing-nav__cta-btn-sec"
              >
                log in
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default LandingNav;
