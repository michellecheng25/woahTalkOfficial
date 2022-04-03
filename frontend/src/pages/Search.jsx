import Navbar from "../components/Navbar";
import UserResults from "../components/UserResults";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Search() {
  let { searchText } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [searchText]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/search/" + searchText);
    setUsers(response.data);
  };
  return (
    <div>
      <Navbar searchText={searchText} />
      <UserResults searchText={searchText} users={users} />
    </div>
  );
}

export default Search;
