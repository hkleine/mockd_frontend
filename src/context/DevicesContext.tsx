import React, { Dispatch, useEffect, useState } from 'react'
import { Device } from '../types';
import { useDevices } from "../hooks";

export interface IDevicesContext {
    devices: Device[] | undefined;
    setCurrentDevices: Dispatch<React.SetStateAction<Device[] | undefined>>;
}

export const DevicesContext = React.createContext<IDevicesContext>({ 
    devices: [] as Device[],
    setCurrentDevices: () => {}
});

export const DevicesProvider = ({ children }:any) => {
    const {isLoading, devicesData} = useDevices();
    const [devices, setCurrentDevices] = useState<Device[]>(devicesData);

    console.log(devicesData);

    return (
        <DevicesContext.Provider value={{devices, setCurrentDevices}}>
            {children}
        </DevicesContext.Provider>
    )
}
