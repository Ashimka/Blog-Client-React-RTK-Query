import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  let content;

  content = (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrap">
          <div className="footer__left ">
            <FontAwesomeIcon className="avatar-image" icon={faEnvelope} />
            <Link className="footer__email" to={"mailto:ashimka@internet.ru"}>
              ashimka@internet.ru
            </Link>
          </div>
          <div className="footer__right">Ashimka BLOG © - 2023</div>
        </div>
      </div>
    </footer>
  );

  return content;
};

export default Footer;
