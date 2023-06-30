import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; 2023 by Dennis Otwoma. Proudly created by{" "}
        <a className="footer__link" href="https://www.linkedin.com/in/otwoma">
          Dennis Otwoma
        </a>
      </p>
      <p className="footer__text">
        <a href="https://github.com/codeme254/" className="footer__link">
          Front end Web developer
        </a>{" "}
        |{" "}
        <a href="https://github.com/codeme254/" className="footer__link">
          Back end Web developer
        </a>{" "}
        |{" "}
        <a href="https://github.com/codeme254/" className="footer__link">
          Fullstack Web developer
        </a>
      </p>
    </footer>
  );
};

export default Footer;
