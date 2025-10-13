import React, { useState } from "react";
import { createUser } from "../apiService";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUser({ username, email, password });
      alert("User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Signup Page</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
      <button onClick={handleSignup}>Create User</button>
    </div>
  );
}

export default Signup;
