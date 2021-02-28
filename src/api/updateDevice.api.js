import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


export default async function updateDevice(newDevice, accessToken) {
    if(newDevice.interval) newDevice.interval = `PT${newDevice.interval}S`;
    try {
      const response = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API}/api/device/${newDevice._id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: newDevice,
      });

      return response;
    } catch (e) {
      console.log(e.message);
      return e;
    }
    
  };