import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImBubbles } from "react-icons/im";
import {
  MdTravelExplore,
  MdAccountCircle,
  MdLogout,
  MdOutlineArrowDropDownCircle,
  MdHome,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillChatDotsFill, BsSearch } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/users/UserContext";
import { logout } from "../context/users/UserActions";

import "./navbar.css";

function Navbar({ searchText }) {
  const { user, error, isFetching, dispatch } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (searchText !== undefined) setSearchInput(searchText);
  }, []);

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();

    if (location.pathname.includes("/search/courses/"))
      navigate("/search/courses/" + searchInput);
    else {
      navigate("/search/users/" + searchInput);
    }
  };

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
          <form className="searchbar" onSubmit={onSearch}>
            <BsSearch />
            <input
              onChange={onChange}
              placeholder="Search"
              className="searchInput"
              value={searchInput}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="navbarRight" styles={{ paddingRight: "50px" }}>
          {user && (
            <div className="navbarIcon">
              <Link to="/">
                <DropDownItem icon={<MdHome />} />
              </Link>
            </div>
          )}
          {user && (
            <div className="navbarIcon">
              <Link to="/courses">
                <DropDownItem icon={<SiGoogleclassroom />} />
              </Link>
            </div>
          )}
          <div className="navbarIcon">
            <Link to="/explore-users">
              <DropDownItem icon={<MdTravelExplore />} />
            </Link>
          </div>
          {user && (
            <div className="navbarIcon">
              <Link to="/chat">
                <DropDownItem icon={<BsFillChatDotsFill />} />
              </Link>
            </div>
          )}
          <div className="navbarIcon">
            <Link to={user ? "/profile/" + user.username : "/login"}>
              <DropDownItem icon={<MdAccountCircle />} />
            </Link>
          </div>
          {user && (
            <div className="navbarIcon">
              <DropDownItem icon={<MdOutlineArrowDropDownCircle />}>
                <DropDownMenu />
              </DropDownItem>
            </div>
          )}
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
  const { user, error, isFetching, dispatch } = useContext(UserContext);

  function DropDownItem(props) {
    return (
      <div className="menu-item">
        {props.icon}
        {props.children}
      </div>
    );
  }

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    logout(dispatch);
    navigate("/");
  };
  return (
    <div className="dropdown">
      <div className="dropdown-item">
        <Link to="/user-settings">
          <DropDownItem icon={<GrUserSettings />}> Settings</DropDownItem>
        </Link>
      </div>

      <div className="dropdown-item" onClick={onLogout}>
        <DropDownItem icon={<MdLogout />}> Logout</DropDownItem>
      </div>
    </div>
  );
}

export default Navbar;
