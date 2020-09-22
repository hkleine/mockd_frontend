import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts';
import { AddDeviceStepperForm } from '../components/AddDeviceStepperForm';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function EditView({ match }) {
  let params = match.params;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);
  const [sensor, setSensor] = useState();

  useEffect(() => {
    const getDevice = async () => {  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
    
        const response = await axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/device/${params.id}/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSensor(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    
    getDevice();
  }, []);

  if (isLoading) {
    return (
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
  }

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium">New Device</h1>
          </div>
          <span>{sensor._id}</span>
          <div className="max-w-sm h-full w-full rounded-lg overflow-hidden shadow-sm bg-white p-4">
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default EditView;
