import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router';
import {DashboardLayout} from "../layouts";
import { DeviceGrid, Loading, SnackbarComponent } from '../components';
import { useAuth0 } from "@auth0/auth0-react";
import { getDevices } from '../api';
import { Device } from '../types';
import { DevicesContext } from "../context";

export function Dashboard(props: RouteComponentProps) {
  const [isLoading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const [devices, setDevices] = useState<Device[]>();
  const value = {devices, setDevices}
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  function setSnackbarOpen() {
    if(props.location.state && props.location.state.deviceCreationSucceeded) {
      setOpenSuccess(true);
      window.history.replaceState(null, '');
    } else if (props.location.state && props.location.state.deviceCreationSucceeded === false) {
      setOpenError(true);
      window.history.replaceState(null, '');
    }
  }

  useEffect(() => {
    setSnackbarOpen();

    const fetchDevices = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      try {
        const response = await getDevices(accessToken)
        setDevices(response.data);
        setLoading(false);
      } catch (error) {
        setDevices([]);
        setLoading(false);
        console.log(error);
      }
    }

    fetchDevices();
  });

  if (isLoading) {
    return (
      <Loading isLoading={isLoading}/>
    );
  }

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium pb-12">Dashboard</h1>
          </div>
          <DevicesContext.Provider value={{devices: devices, setCurrentDevices: setDevices}}>
            <DeviceGrid  />
          </DevicesContext.Provider>
        </div>
      </DashboardLayout>
      <SnackbarComponent open={openSuccess} setOpen={setOpenSuccess} severity={'success'}>
        Successfully created Device
      </SnackbarComponent>
      <SnackbarComponent open={openError} setOpen={setOpenError} severity={'error'}>
        Failed to create Device
      </SnackbarComponent>
  </div>
  );
}