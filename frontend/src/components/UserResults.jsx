//import { useEffect, useState } from "react";
import UserItem from "./UserItem";
//import axios from "axios";
import "./userResults.css";
import { ReactComponent as NoUsers } from "../assets/svg/undraw_people_search_re_5rre.svg";

function UserResults({ users }) {
  return (
    <div className="userResultsList">
      {users.length === 0 ? (
        <div className="noUsersFound">
          <NoUsers />
          <p>No Users found</p>
        </div>
      ) : (
        users.map((user) => {
          return <UserItem key={user._id} foundUser={user} />;
        })
      )}
    </div>
  );
}

UserResults.defaultProps = {
  users: [],
};

export default UserResults;
