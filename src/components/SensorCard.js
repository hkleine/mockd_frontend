import React from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineCode, HiOutlineTrash } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import axios from 'axios';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

function SensorCard({sensorIn}) {
    const [sensor, setSensor] = React.useState(sensorIn);
    const editUrl = `/edit/${sensorIn._id}`

    function toggleSensor() {
        axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/device/${sensor._id}/toggle` })
        .then(response => {
          console.log(response.data);
          setSensor(response.data);
        });
    }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-sm bg-white p-4">
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <h3 className="text-gray-700 text-lg">{sensor.name}</h3>
                <div className="flex flex-row">
                    <NavLink className="outline-none pr-2" to={editUrl} sensor={sensor} >
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600 hover:text-purple-700">
                                <HiOutlineCode />
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                    <NavLink className="outline-none" to="">
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600 hover:text-purple-700">
                                <HiOutlineTrash />
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </div>
            </div>
            {sensor.protocol === 'http' &&
                <div>
                    <div className="flex flex-row justify-between py-4">
                        <span className="text-gray-600 text-sm">{sensor.http_host}:{sensor.http_port}{sensor.http_route}</span>
                        <div className="flex justify-center items-center py-2 px-4 rounded-full text-white bg-primary shadow-md">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{sensor.protocol}</div>
                        </div>
                    </div>
                    <label>
                        <Toggle
                            className="toggle"
                            defaultChecked={sensor.isRunning}
                            icons={false} />
                    </label>
                </div>
            }
            {sensor.protocol === 'mqtt' &&
                <div>
                    <div className="flex flex-row justify-between py-4">
                        <span className="text-gray-600 text-sm">{sensor.mqtt_topic}</span>
                        <div className="flex justify-center items-center py-2 px-4 rounded-full text-white bg-indigo-500 shadow-md">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{sensor.protocol}</div>
                        </div>
                    </div>
                    <label>
                        <Toggle
                            checked={sensor.is_running}
                            onChange={toggleSensor}
                            className="toggle"
                            icons={false} />
                    </label>
                </div>
            }
        </div>
    </div>
  );
};

export default SensorCard;