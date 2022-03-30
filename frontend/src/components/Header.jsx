import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBorderNone,
} from "react-icons/fa";

import { ImBubbles } from "react-icons/im";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header" style={{ background: "#152E34" }}>
      <div className="logo">
        <Link to="/login">
          <ImBubbles />
          WoahTalk
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="register-btn">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
