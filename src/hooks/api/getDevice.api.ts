import axios from 'axios';

export async function getDevice(deviceId: string, accessToken: string) {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/device/${deviceId}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
};