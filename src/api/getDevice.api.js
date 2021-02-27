import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const { getAccessTokenSilently } = useAuth0();

export const getDevice = async () => {
  try {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });

    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/device/${params.id}/`,
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