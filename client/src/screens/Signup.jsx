import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
      address: credential.address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userEmail", credential.email);
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 409) {
        alert("Already Registered with this Email");
      } else {
        alert("Login Failed");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  return (
    <>
      <div className="signup">
        <form className="w-50 mt-5" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credential.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Your Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={credential.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Sign Up
          </button>
          <Link to={"/login"} className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
