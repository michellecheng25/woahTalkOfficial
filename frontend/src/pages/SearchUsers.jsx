import Navbar from "../components/Navbar";
import UserResults from "../components/UserResults";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toggle from "../components/Toggle";

function SearchUsers() {
  let { searchText } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [searchText]);

  const fetchUsers = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/search/users/" + searchText
    );
    setUsers(response.data);
  };

  return (
    <div>
      <Navbar searchText={searchText} />
      <Toggle
        active={"users"}
        firstLink={"/search/users/" + searchText}
        secondLink={"/search/courses/" + searchText}
      />
      <UserResults searchText={searchText} foundUsers={users} />
    </div>
  );
}

export default SearchUsers;
