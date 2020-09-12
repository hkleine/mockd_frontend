import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth0();

  
  const logoutWithRedirect = () =>
  logout({
    returnTo: window.location.origin,
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      {isAuthenticated && (
        <div>
          <img
            src={user.picture}
            alt="Profile"
            className="nav-user-profile rounded-circle"
            width="50"
          />
          <p>{user.name}</p>
        </div>
      )}
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      <button onClick={() => logoutWithRedirect()}>Log Out</button>
    </div>
  );
}

export default Dashboard;
