import axios from 'axios';

export async function toggleDevice(deviceId: string, accessToken: string) {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/device/${deviceId}/toggle`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response
};