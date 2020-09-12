import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
  const {
    user,
    loginWithRedirect,
  } = useAuth0();

  return (
    <div style={{ padding: 20 }}>
      <h2>Landing Page</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      <button id="qsLoginBtn" onClick={() => loginWithRedirect()}>
        Log in
      </button>
    </div>
  );
}

export default Landing;
