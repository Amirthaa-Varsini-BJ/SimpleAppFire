import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Main() {
  const { isAuthenticated } = useAuth0();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Main Page</h2>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export default Main;
