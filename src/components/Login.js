import React, { useState } from "react";
import { signIn } from "../firebase/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      alert("Login Successful!");
      navigate("/main");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login Page</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/">Signup</a></p>
    </div>
  );
}

export default Login;
