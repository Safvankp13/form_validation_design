import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    username: /^[a-zA-Z0-9_]{3,15}$/,
    phone: /^[0-9]{10}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, username, email, phone, password, confirmPassword } =
      data;

    if (!email || !password) {
      return toast.error("Please fill in all required fields.");
    }
    if (!regex.email.test(email)) {
      return toast.error("Invalid email format.");
    }
    if (!regex.password.test(password)) {
      return toast.error(
        "Password must include 8+ chars, 1 uppercase, 1 number & 1 symbol."
      );
    }

    if (!isLogin) {
      if (!fullName || !username || !phone || !confirmPassword) {
        return toast.error("Please fill all signup fields.");
      }
      if (!regex.username.test(username)) {
        return toast.error(
          "Username must be 3-15 letters/numbers/underscores."
        );
      }
      if (!regex.phone.test(phone)) {
        return toast.error("Phone number must be 10 digits.");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match.");
      }
    }

    toast.success(isLogin ? "Login successful" : "Signup successful");

    setData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={data.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={data.phone}
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button className="btn" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="toggle" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
