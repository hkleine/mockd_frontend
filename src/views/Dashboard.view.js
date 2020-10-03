import React, { useState, useEffect } from "react";
import {DashboardLayout} from "../layouts";
import { SensorGrid, Loading } from '../components';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { remove } from 'lodash';

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();
  const [sensors, setSensors] = useState();

  function updateSensors(updatedSensor) {
    setSensors([]);
    remove(sensors, function (s) {
      return s._id === updatedSensor._id;
    });
    setSensors(sensors)
  }


  useEffect(() => {
    const getDevices = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        console.log(user, accessToken);
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
            <h1 className="text-gray-700 text-2xl font-medium pb-12">Dashboard</h1>
          </div>
          <SensorGrid sensors={sensors} updateSensors={updateSensors} />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
