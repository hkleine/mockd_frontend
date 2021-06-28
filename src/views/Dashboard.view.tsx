import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router';
import {DashboardLayout} from "../layouts";
import { DeviceGrid, Loading, MenuHeading } from '../components';
import { useAuth0 } from "@auth0/auth0-react";
import { useDevices } from '../hooks';
import { Device } from '../types';
import { DevicesProvider } from "../context";

export function Dashboard(props: RouteComponentProps) {

  // if (isLoading) {
  //   return (
  //     <Loading isLoading={isLoading}/>
  //   );
  // }

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <MenuHeading>Dashboard</MenuHeading>
          <DevicesProvider>
            <DeviceGrid  />
          </DevicesProvider>
        </div>
      </DashboardLayout>
  </div>
  );
}