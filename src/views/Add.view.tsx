import React from 'react';
import { StepForm } from '../components';
import { DashboardLayout } from '../layouts';

export function AddView() {
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
