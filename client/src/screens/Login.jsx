import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = localStorage.getItem("authToken");

  useEffect(() => {
    if (auth) navigate("/");
  });

  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      email: credential.email,
      password: credential.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userEmail", credential.email);
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 400) {
        alert("Invalid Email");
      } else if (err.response?.status === 401) {
        alert("Enter Correct Password");
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <div>
      <div className="signup">
        <form className="w-50 mt-5" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credential.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credential.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Login
          </button>
          <Link to={"/signup"} className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
