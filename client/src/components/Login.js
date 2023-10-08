import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

   const Loading = () => {
    return (
      <div class="spinner-border mx-2 px-1" style={{height:"1rem",width:"1rem"}} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleViewPassword = () => {
    setCredentials({
      ...credentials,
      showPassword: !credentials.showPassword,
    });
  };

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setLoading(true);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      if (json.error) {
        props.showAlert("Invalid Details! " + json.error, "danger");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="text-center mt-5 mb-4">
        <h1>iNOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <div className="container form">
        <p className="text-center">
          <i>Login to continue using iNotebook 😊 </i>
        </p>
        <div className="mb-4 input-container">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onchange}
            id="email"
            name="email"
            placeholder="name@example.com"
          />
          {errors.email && (
            <span className="error">
              <i className="fa fa-info-circle"></i> {errors.email}
            </span>
          )}
        </div>

        <div className="mb-4 input-container">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <i
           className={`fa fa-eye${
             ! credentials.showPassword ? "-slash" : ""
            } view-password`}
            onClick={handleViewPassword}
          ></i>
          <input
            type={credentials.showPassword ? "text" : "password"}
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
          />
          {errors.password && (
            <span className="error">
              <i className="fa fa-info-circle"></i> {errors.password}
            </span>
          )}
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={
            credentials.email.length <= 0 ||
            credentials.password.length <= 0 ||
            loading
          }
          className="inline-flex bg-primary items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded mx-2"
          onClick={handleClick}
        >
          {loading ? <Loading /> : "Login"}
        </button>
      </div>
      <br />
      <p className="text-center last-para">
        Don't have an account?{" "}
        <a
          href="/signup"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          SignUp-&gt;
        </a>{" "}
      </p>
    </div>
  );
}

export default Login;
