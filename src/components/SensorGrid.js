import React from "react";
import SensorCard from './SensorCard'

import AddDeviceButton from './AddDeviceButton';

const SensorGrid = ({sensors, updateSensors}) => {

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10">
        {sensors.map((sensor, index) => {
            return <SensorCard key={index} sensorIn={sensor} updateSensors={updateSensors} />
        })}
     <AddDeviceButton />
    </div>
  );
};

export default SensorGrid;