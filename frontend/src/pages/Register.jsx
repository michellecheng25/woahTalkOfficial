import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      Axios.post("http://localhost:5000/api/users", {
        username,
        name,
        email,
        password,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <div style={styles.form}>
      <section className="heading" style={styles.heading}>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              style={styles.input}
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              style={styles.input}
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              style={styles.input}
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" style={styles.btn}>
              Submit
            </button>
          </div>
        </form>
        <p style={styles.paragraph}>
          Already have an account? &nbsp;
          <span>
            <Link style={styles.themeColor} to="/login">
              Sign In
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
    letterSpacing: "1.4px",
    cursor: "pointer",
  },
  form: {
    height: "100vh",
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "Open Sans",
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
    padding: "180px 0px 15px 0px",
  },
};

export default Register;
