import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import axios from "axios";
import "./userResults.css";
import { ReactComponent as NoUsers } from "../assets/svg/undraw_people_search_re_5rre.svg";

function UserResults({ searchText }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [searchText]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/search/" + searchText);
    setUsers(response.data);
  };

  return (
    <div className="userResultsList">
      {users.length === 0 ? (
        <div className="noUsersFound">
          <NoUsers />
          <p>No Users found</p>
        </div>
      ) : (
        users.map((user) => {
          return <UserItem key={user._id} user={user} />;
        })
      )}
    </div>
  );
}

export default UserResults;
