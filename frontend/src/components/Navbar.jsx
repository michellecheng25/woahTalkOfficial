import { Link } from "react-router-dom";
import { ImBubbles } from "react-icons/im";
import "./navbar.css";

function Navbar() {
  return (
    <section className="navbar">
      <div className="navbarLeft">
        <Link to="/">
          <span className="logo">
            <ImBubbles />
            WoahTalk
          </span>
        </Link>
      </div>
      <div className="navbarCenter"></div>
      <div className="navbarRigth"></div>
    </section>
  );
}

export default Navbar;
