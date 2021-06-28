import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const GetDevices = async () => {
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = await getAccessTokenSilently({
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  });
  const { data } = await axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/user/devices/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
  };