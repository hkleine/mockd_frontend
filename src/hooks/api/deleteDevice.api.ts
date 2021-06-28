import axios from 'axios';

export async function deleteDevice(deviceId: string, accessToken: string) {
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API}/api/device/${deviceId}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response
};