import React from 'react';
import { DashboardLayout } from '../layouts';
import { AddDeviceStepperForm } from '../components/AddDeviceStepperForm';

function AddView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="">Add</h1>
            <span>Moin</span>
          </div>
          <AddDeviceStepperForm />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default AddView;
