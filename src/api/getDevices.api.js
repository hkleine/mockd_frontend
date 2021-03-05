import axios from 'axios';


export default async function getDevices(accessToken) {
  const response = await axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/user/devices/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
  };