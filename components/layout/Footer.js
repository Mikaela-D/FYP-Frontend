import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>
        © {new Date().getFullYear()} Call Centre CRM Platform. All rights
        reserved.
      </p>
      <div className={classes.socialMedia}>
        <a
          href="https://www.facebook.com/Genesys"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} className={classes.socialIcon} />
        </a>
        <a
          href="https://x.com/Genesys?mx=2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faXTwitter} className={classes.socialIcon} />
        </a>
        <a
          href="https://www.instagram.com/genesyscx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className={classes.socialIcon} />
        </a>
        <a
          href="https://www.linkedin.com/company/genesys/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className={classes.socialIcon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
