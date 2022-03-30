import { FaSignInAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loginCall } from "../apiCalls";
import UserContext from "../context/users/UserContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const { user, error, isFetching, dispatch } = useContext(UserContext);

  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    loginCall({ username, password }, dispatch);
  };

  return (
    <div style={styles.form}>
      <section className="heading" style={styles.heading}>
        <h1>
          <FaSignInAlt /> Sign In
        </h1>
        <p>Welcome back!</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div>
            <input
              style={styles.input}
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <input
              style={styles.input}
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <button style={styles.btn}>Submit</button>
          </div>
        </form>
        <p style={styles.paragraph}>
          Don’t have an account? &nbsp;
          <span>
            <Link style={styles.themeColor} to="/register">
              Sign Up
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}

let styles = {
  btn: {
    background: "#ECA645",
    fontSize: "12px",
    padding: "9px 12px 9px 12px",
    color: "white",
    borderRadius: "6px",
    height: "37px",
    width: "275px",
    fontWeight: "Bolder",
    cursor: "pointer",
  },
  form: {
    height: "100vh",
    fontSize: "30px",
    textAlign: "center",
    backgroundColor: "#152E34",
  },
  input: {
    borderRadius: "6px",
    height: "37px",
    width: "280px",
    backgroundColor: "#2B515C",
    color: "white",
    fontWeight: "bold",
    borderColor: "#2B515C",
    padding: "10px",
    marginBottom: "10px",
  },
  themeColor: {
    color: "#ECA645",
  },
  paragraph: {
    color: "White",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bolder",
    padding: "10px 0px 15px 0px",
  },
  heading: {
    color: "White",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bolder",
    padding: "100px 0px 15px 0px",
  },
};
export default Login;
