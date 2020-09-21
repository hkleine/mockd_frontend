import React from "react";
import {DashboardLayout} from "../layouts"

function EditView({ match }) {
  let params = match.params;

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium">Edit Device</h1>
          </div>
          <strong>{params.id}</strong>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default EditView;
