import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const { getAccessTokenSilently } = useAuth0();

export default async function updateDevice(newDevice) {
    if(newDevice.interval) newDevice.interval = `PT${newDevice.interval}S`;
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });

      const response = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API}/api/device/${newDevice._id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: newDevice,
      });
      console.log("moin");
      return response;
    } catch (e) {
      console.log(e.message);
      return e;
    }
    
  };