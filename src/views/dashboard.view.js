import React, { useState, useEffect } from "react";
import {DashboardLayout} from "../layouts";
import { SensorGrid, Loading } from '../components';
import axios from 'axios';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();
  const [sensors, setSensors] = useState();


  useEffect(() => {
    const getDevices = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
    
        const response = await axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/user/${user.sub}/devices/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSensors(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    getDevices();
  }, []);

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
            <h1 className="text-gray-700 text-2xl font-medium">Dashboard</h1>
          </div>
          <SensorGrid sensors={sensors} />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
