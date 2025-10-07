import React from "react";
import LoginButton from "./LoginButton";

function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome to Auth0 App</h2>
      <LoginButton />
    </div>
  );
}

export default Home;
