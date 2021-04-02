import React, { Dispatch, SetStateAction } from 'react'
import { Device } from '../types';

export interface IDevicesContext {
    devices: Device[] | undefined;
    setCurrentDevices: Dispatch<React.SetStateAction<Device[] | undefined>>;
}

export const DevicesContext = React.createContext<IDevicesContext>({ 
    devices: [] as Device[],
    setCurrentDevices: () => {}
});
