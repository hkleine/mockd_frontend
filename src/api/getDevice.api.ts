import axios from 'axios';
import moment from 'moment';

export async function getDevice(deviceId: string, accessToken: string) {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/device/${deviceId}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if(response.data.interval) {
      response.data.interval = moment.duration(response.data.interval).asSeconds();
      console.log(response.data.interval);
    }
    return response.data;
};