import axios from 'axios';
import { Device } from '../../types';

export async function createDevice(newDevice: Device, accessToken: string) {
    return await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/device/create`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: newDevice
    });
  };