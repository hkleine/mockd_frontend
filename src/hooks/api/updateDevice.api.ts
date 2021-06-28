import axios from 'axios';
import { Device } from '../../types';

export async function updateDevice(deviceToUpdate: Partial<Device>, accessToken: string) {
    if(deviceToUpdate.interval) deviceToUpdate.interval = `PT${deviceToUpdate.interval}S`;
    const response = await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API}/api/device/${deviceToUpdate._id}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: deviceToUpdate,
    });

    return response;  
  };