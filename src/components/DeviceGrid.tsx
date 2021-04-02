import React, { useContext } from "react";
import DeviceCard from './DeviceCard'

import AddDeviceButton from './AddDeviceButton';
import { Device } from "../types";
import { DevicesContext } from "../context";

export const DeviceGrid = () => {
  const {devices} = useContext(DevicesContext)

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10">
        {devices!.map((device: Device, index: number) => {
            return <DeviceCard key={index} deviceIn={device} />
        })}
     <AddDeviceButton />
    </div>
  );
};
