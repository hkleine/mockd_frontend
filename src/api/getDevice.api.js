import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


export default async function getDevice(deviceId, accessToken) {
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/device/${deviceId}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response
  } catch (e) {
    console.log(e.message);
    return e;
  }
};