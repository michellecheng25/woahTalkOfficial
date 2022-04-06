import UserItem from "./UserItem";
import "./userResults.css";

function UserResults({ foundUsers }) {
  return (
    <div className="userResultsList">
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
