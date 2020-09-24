import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { DashboardLayout } from "../layouts";

const Loading = ({isLoading}) => (
  <div>
  <DashboardLayout>
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-gray-700 text-2xl font-medium">Dashboard</h1>
      </div>
    </div>
    <div className="flex items-center align-center justify-center pt-24">              
      <ClimbingBoxLoader
        color={"#5D40B8"}
        loading={isLoading}
      />
    </div>
  </DashboardLayout>
</div>
);

export default Loading;
