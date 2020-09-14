import React, { useState, useEffect } from "react";
import {DashboardLayout} from "../layouts"

function Dashboard() {
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(`${process.env.REACT_APP_API}/device/5f5fb02bde3037095caa1fdf`)
        .then(response => {
          console.log(response);
        })
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <DashboardLayout>
        <h3>Moin</h3>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
