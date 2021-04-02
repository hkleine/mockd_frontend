import React, { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';

import { DeleteDialog, DeviceToggleButton } from '.';
import { HiOutlineCode, HiOutlineTrash, HiOutlineClock } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import axios from 'axios';
import "react-toggle/style.css";
import { useAuth0 } from "@auth0/auth0-react";
import moment, { Duration } from 'moment';
import { Device } from "../types";
import { DevicesContext } from "../context";
import { List, remove } from "lodash";


function DeviceCard({deviceIn}: any) {
    const { getAccessTokenSilently } = useAuth0();
    const [device, setDevice] = useState(deviceIn);
    const [open, setOpen] = useState(false);
    const editUrl = `/edit/${deviceIn._id}`;
    const {devices, setCurrentDevices} = useContext(DevicesContext)

    function updatedevices(updatedDevice: Device) {
        setCurrentDevices([]);
        remove(devices as List<Device>, function (device: Device) {
          return device._id === updatedDevice._id;
        });
        setCurrentDevices(devices)
    }

    async function deleteDevice() {
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        axios({ method: 'delete', url: `${process.env.REACT_APP_API}/api/device/${device._id}`, headers: {Authorization: `Bearer ${accessToken}`,} })
        .then(() => {
            updatedevices(device);
        });
    }

    function parseInterval(interval: Duration) {
        const intervalInSec = moment.duration(interval).asSeconds();
        if(intervalInSec < 60) return `${intervalInSec}s`;
        else if(intervalInSec < 3600) return `${moment.duration(interval).asMinutes()}m`;
        else return  `${moment.duration(interval).asHours()}h`;   
    }
    

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-sm bg-white p-4">
        <DeleteDialog open={open} setOpen={setOpen} deleteDevice={deleteDevice} />

        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <h3 className="text-gray-700 text-lg">{device.name}</h3>
                <div className="flex flex-row">
                    <NavLink className="outline-none pr-2" to={editUrl}>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600 hover:text-purple-700">
                                <HiOutlineCode />
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                    <button className="outline-none pb-2" onClick={() => setOpen(true)}>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600 hover:text-purple-700">
                                <HiOutlineTrash />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
            {device.protocol === 'http' &&
                <div className="flex flex-row justify-between py-4">
                    <span className="text-gray-600 text-sm">{device.http_host}</span>
                    <div className="flex justify-center items-center py-2 px-4 rounded-full text-white bg-primary shadow-md">
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{device.protocol}</div>
                    </div>
                </div>
            }
            {device.protocol === 'mqtt' &&
                <div className="flex flex-row justify-between py-4">
                    <span className="text-gray-600 text-sm">{device.mqtt_topic}</span>
                    <div className="flex justify-center items-center py-2 px-4 rounded-full text-white bg-indigo-500 shadow-md">
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{device.protocol}</div>
                    </div>
                </div>
            }
            <div className="flex flex-row items-center">
                <DeviceToggleButton device={device} setDevice={setDevice} />
                <div className="flex flex-row items-center pb-2 pl-4">
                    <IconContext.Provider value={{ style: { fontSize: '15px' } }}>
                        <div className="text-gray-600">
                            <HiOutlineClock />
                        </div>
                    </IconContext.Provider>
                    <span className="text-gray-600 text-sm">{parseInterval(device.interval)}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DeviceCard;