import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineCode, HiOutlineTrash } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import axios from 'axios';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useAuth0 } from "@auth0/auth0-react";


function SensorCard({sensorIn, updateSensors}) {
    const { getAccessTokenSilently } = useAuth0();
    const [sensor, setSensor] = useState(sensorIn);
    const editUrl = `/edit/${sensorIn._id}`;

    async function toggleSensor() {
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/device/${sensor._id}/toggle`, headers: {Authorization: `Bearer ${accessToken}`,} })
        .then(response => {
          setSensor(response.data);
        });
    }

    async function deleteSensor() {
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        axios({ method: 'delete', url: `${process.env.REACT_APP_API}/api/device/${sensor._id}`, headers: {Authorization: `Bearer ${accessToken}`,} })
        .then(() => {
            updateSensors(sensor);
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
                    <button className="outline-none pb-2" onClick={deleteSensor}>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600 hover:text-purple-700">
                                <HiOutlineTrash />
                            </div>
                        </IconContext.Provider>
                    </button>
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
                            onChange={toggleSensor}
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