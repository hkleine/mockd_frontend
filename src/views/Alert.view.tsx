import React from "react";
import {DashboardLayout} from "../layouts"

function AlertView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="">Alerts</h1>
            <span>Moin</span>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default AlertView;
