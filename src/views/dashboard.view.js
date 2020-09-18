import React, { useState, useEffect } from "react";
import {DashboardLayout} from "../layouts"

function Dashboard() {
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(`${process.env.REACT_APP_API}/api/device/5f5fb02bde3037095caa1fdf`)
        .then(response => {
          console.log(response);
        })
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="">Dashboard</h1>
            <span>Moin</span>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
