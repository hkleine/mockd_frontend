import React from "react";
import { HttpMethods } from '../types';

function ProtocolInputs({ device, setDevice, register }) {
  switch (device.protocol) {
    case 'mqtt':
      return (
        <div>
          <div className="flex flex-col pb-12 max-w-lg">
            <label className="text-gray-600">MQTT Host</label>
            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.mqtt_host} type="text" name="mqtt_host" ref={register()} />
          </div>
          
          <div className="flex flex-col pb-12 max-w-lg">
            <label className="text-gray-600">MQTT Topic</label>
            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.mqtt_topic} type="text" name="mqtt_topic" ref={register()} />
          </div>

          <div className="flex flex-row pb-12 max-w-lg">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600">MQTT Username</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.mqtt_username} type="text" name="mqtt_username" ref={register()} />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600">MQTT Password</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.mqtt_password} type="password" name="mqtt_password" ref={register()} />
            </div>
          </div>
        </div>
      );
    case 'http':
      return (
        <div>
          <div className="flex flex-col max-w-lg pb-12">
            <label className="text-gray-600">HTTP Method</label>
            <select 
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" 
                type="text"
                defaultValue={device.http_method}
                name="http_method" 
                ref={register()}
                onChange={(e) => {
                  device.http_method = e.currentTarget.value;
                  setDevice({...device});
                }}
              >
                <option value={HttpMethods.POST}>POST</option>
                <option value={HttpMethods.PUT}>PUT</option>
                <option value={HttpMethods.PATCH}>PATCH</option>
              </select>
            </div>


          <div className="flex flex-row pb-12 max-w-lg">
            <div className="flex flex-col">
              <label className="text-gray-600">HTTP Host</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.http_host} type="text" name="http_host" ref={register()} />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">HTTP Port</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={device.http_port || 0 } type="number" name="http_port" ref={register()} />
            </div>
          </div>
          
        </div>
      );
    default:
      return null;
  }
}

export default ProtocolInputs;
