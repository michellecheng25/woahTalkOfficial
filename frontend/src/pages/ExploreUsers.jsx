import Navbar from "../components/Navbar";
import UserResults from "../components/UserResults";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../components/Toggle";

function ExploreUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("/api/users/");
    setUsers(response.data);
  };

  return (
    <div>
      <Navbar />
      <Toggle
        active={"users"}
        firstLink={"/explore-users"}
        secondLink={"/explore-courses"}
      />
      <UserResults foundUsers={users} />
    </div>
  );
}

export default ExploreUsers;
