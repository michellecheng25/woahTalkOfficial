import { Link } from "react-router-dom";
import { ImBubbles } from "react-icons/im";
import { MdTravelExplore, MdAccountCircle } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillChatDotsFill, BsSearch } from "react-icons/bs";
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
      <div className="navbarCenter">
        <div className="searchbar">
          <BsSearch />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarIcon">
          <SiGoogleclassroom />
        </div>
        <div className="navbarIcon">
          <MdTravelExplore />
        </div>
        <div className="navbarIcon">
          <BsFillChatDotsFill />
        </div>
        <div className="navbarIcon">
          <MdAccountCircle />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
