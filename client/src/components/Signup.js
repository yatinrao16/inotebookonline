import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

   const Loading = () => {
    return (
      <div class="spinner-border mx-2 px-1" style={{height:"1rem",width:"1rem"}} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  };
  const handleViewPassword = (e) => {
    if (e.target.id === "password") {
      setCredentials({
        ...credentials,
        showPassword: !credentials.showPassword,
      });
    } else {
      setCredentials({
        ...credentials,
        showConfirmPassword: !credentials.showConfirmPassword,
      });
    }
  };

  const handleClick = async (e) => {
    setLoading(true);
    const { email, name, password, cpassword } = credentials;

    const response = await fetch(" https://inotebookonlinecloud3.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password, cpassword }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account created successfully", "success");
      setLoading(true);
      navigate("/login");
    } else {
      props.showAlert("Account not created", "danger");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-3">
        <h1>iNOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <div className="container form">
        <p className="text-center my-3">
          <i>New to iNotebook? 👉🏻Create a new account here! </i>
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            id="name"
            name="name"
          />
          {errors.name && (
            <span className="error">
              <i className="fa fa-info-circle"></i> {errors.name}
            </span>
          )}
        </div>
        <div className="mb-4 input-container">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <i
           className={`fa fa-eye${
             !credentials.showPassword ? "-slash" : ""
            } view-password`}
            id="password"
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
        <div className="mb-4 input-container">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <i
            className={`fa fa-eye${
              !credentials.showConfirmPassword ? "-slash" : ""
            } view-password`}
            id="confirm-password"
            onClick={handleViewPassword}
          ></i>
          <input
            type={credentials.showConfirmPassword ? "text" : "password"}
            className="form-control"
            onChange={onchange}
            id="cpassword"
            name="cpassword"
          />
          {errors.cpassword && (
            <span className="error">
              <i className="fa fa-info-circle"></i> {errors.cpassword}
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
            credentials.name.length <= 0 ||
            loading
          }
          className="inline-flex bg-primary items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded mx-2"
          onClick={handleClick}
        >
          {loading ? <Loading /> : "Signup"}
        </button>
      </div>
      <br />
      <p className="text-center last-para">
        Already have an account?{" "}
        <a href="/login" style={{ textDecoration: "none", fontWeight: "bold" }}>
          Login-&gt;
        </a>{" "}
      </p>
    </>
  );
}

export default SignUp;
