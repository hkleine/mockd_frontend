import React from "react";
import SensorCard from './SensorCard'

const SensorGrid = ({sensors}) => {
    console.log(sensors);
  return (
    <div className="grid pt-16 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20">
        {sensors.map((sensor, index) => {
            return <SensorCard key={index} sensorIn={sensor} />
        })}
    </div>
  );
};

export default SensorGrid;