import React from 'react';
import { DashboardLayout } from '../layouts';
import { AddDeviceStepperForm } from '../components/AddDeviceStepperForm';
import StepForm from '../components/StepForm/StepForm'

function AddView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <StepForm />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default AddView;
