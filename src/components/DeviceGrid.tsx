import React from "react";
import DeviceCard from './DeviceCard'

import AddDeviceButton from './AddDeviceButton';
import { Device } from "../types";

export const DeviceGrid = ({devices, updateDevice}: any) => {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10">
        {devices.map((device: Device, index: number) => {
            return <DeviceCard key={index} deviceIn={device} updateDevice={updateDevice} />
        })}
     <AddDeviceButton />
    </div>
  );
};
