import React from "react";
import SensorCard from './SensorCard'

import AddDeviceButton from './AddDeviceButton';

const SensorGrid = ({sensors}) => {
  return (
    <div className="grid pt-16 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {sensors.map((sensor, index) => {
            return <SensorCard key={index} sensorIn={sensor} />
        })}
     <AddDeviceButton />
    </div>
  );
};

export default SensorGrid;