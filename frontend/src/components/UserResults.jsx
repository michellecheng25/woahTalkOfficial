import UserItem from "./UserItem";
import "./userResults.css";
import { ReactComponent as NoUsers } from "../assets/svg/undraw_people_search_re_5rre.svg";
import { useState, useContext } from "react";
import UserContext from "../context/users/UserContext";

function UserResults({ foundUsers }) {
  const { user } = useContext(UserContext);
  return (
    <div className="userResultsList">
      {foundUsers.length === 0 && (
        <div className="noUsersFound">
          <NoUsers />
          <p>No Users Found</p>
        </div>
      )}
      {foundUsers.map((foundUser, index) => {
        return <UserItem key={foundUser._id} foundUser={foundUser} />;
      })}
    </div>
  );
}

UserResults.defaultProps = {
  foundUsers: [],
};

export default UserResults;
