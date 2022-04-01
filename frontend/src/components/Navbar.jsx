import { Link } from "react-router-dom";
import { ImBubbles } from "react-icons/im";
import { MdTravelExplore, MdAccountCircle, MdLogout } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillChatDotsFill, BsSearch } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { useState } from "react";

import "./navbar.css";

function Navbar() {
  return (
    <section className="navbar">
      <div className="navbar-container">
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
            <DropDownItem icon={<SiGoogleclassroom />} />
          </div>
          <div className="navbarIcon">
            <DropDownItem icon={<MdTravelExplore />} />
          </div>
          <div className="navbarIcon">
            <DropDownItem icon={<BsFillChatDotsFill />} />
          </div>
          <div className="navbarIcon">
            <DropDownItem icon={<MdAccountCircle />}>
              <DropDownMenu />
            </DropDownItem>
          </div>
        </div>
      </div>
    </section>
  );
}

function DropDownItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li onClick={() => setOpen(!open)}>
      <div className="dropdownItem">{props.icon}</div>

      {open && props.children}
    </li>
  );
}

function DropDownMenu() {
  function DropDownItem(props) {
    return (
      <div className="menu-item">
        {props.icon}
        {props.children}
      </div>
    );
  }

  const onLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="dropdown">
      <div className="dropdown-item">
        <Link to="/profile">
          <DropDownItem icon={<GrUserSettings />}> Profile</DropDownItem>
        </Link>
      </div>

      <div className="dropdown-item" onClick={onLogout}>
        <DropDownItem icon={<MdLogout />}> Logout</DropDownItem>
      </div>
    </div>
  );
}

export default Navbar;
