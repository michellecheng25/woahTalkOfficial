import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBorderNone,
} from "react-icons/fa";

import "./header.css";
import { ImBubbles } from "react-icons/im";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  return (
    <header className="header" style={{ background: "#152E34" }}>
      <div className="logo">
        <ImBubbles />
        WoahTalk
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
