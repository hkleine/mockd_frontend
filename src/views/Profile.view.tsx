import React from "react";
import {DashboardLayout} from "../layouts"

function ProfileView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="">Profile</h1>
            <span>Moin</span>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default ProfileView;
