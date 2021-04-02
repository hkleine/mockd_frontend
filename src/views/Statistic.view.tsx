import React from "react";
import {DashboardLayout} from "../layouts"

export function StatisticView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="">Statistics</h1>
            <span>Moin</span>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}