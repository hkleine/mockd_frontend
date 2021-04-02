import React, { useContext, useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts';
import { useAuth0 } from '@auth0/auth0-react';
import { DeviceToggleButton, Loading, ProtocolInputs, SnackbarComponent } from '../components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import 'jsoneditor-react/es/editor.min.css';
import { NavLink } from 'react-router-dom';
import { Protocols } from '../types';
import { updateDevice, getDevice, getLogs } from '../api';
import { SocketContext } from '../context/SocketContext';
import { Device, Log } from "../types";

function EditView({ match }: any) {
  let params = match.params;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);
  const [device, setDevice] = useState<Device | null>(null);
  const [logs, setLogs] = useState<Log[]>();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const { handleSubmit, register, errors, setValue } = useForm();
  const socket = useContext(SocketContext)

  const onSubmit = async (data:Device) => {
    setLoading(true);
    try {
      const newDevice = await updateDevice({...data, _id: params.id}, await getAccessToken());
      setDevice(newDevice.data);
      setValue('data', newDevice.data.data);
      setLoading(false);
      setOpenSuccess(true);
    } catch (error) {
      setErrorText(error.message);
      setOpenError(true);
      setLoading(false);
    }

  };

  const getAccessToken = async () => {
    return await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
  }

  const intervalAsSeconds = (interval: string) => {
    return moment.duration(interval).asSeconds();
  };

  useEffect(() => {
    register({ name: 'data' });
    (async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      Promise.all([getLogs(params.id, accessToken), getDevice(params.id, accessToken)]).then((data) => {
        setLogs(data[0].reverse());
        setDevice(data[1].data);
        setLoading(false);
      })
    })();
  }, [register, getAccessTokenSilently, params.id]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected");
    });
    
    // Listens for incoming messages
    socket.on(params.id, (log: Log) => {
      setLogs(prevLogs => [log, ...prevLogs as Log[]]);
    });

    return () => {
      console.log("disconnecting");
      socket.disconnect();
    };

  }, []);

  if (isLoading) {
    return <Loading isLoading={true}/>;
  }

  return (
    device && logs ?
    <div>
      <DashboardLayout>
        <div className="flex flex-col pb-12">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium pb-12">Edit {device.name}</h1>
          </div>
          <div className="flex flex-row">
          <div className="rounded-lg overflow-hidden shadow-sm bg-white p-4 max-w-screen-xs p-16">
            <DeviceToggleButton device={device} setDevice={setDevice} />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex flex-col pb-12 max-w-lg">
                <label className="text-gray-600">Name</label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
                  defaultValue={device.name}
                  name="name"
                  ref={register({
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                />
                {errors.name?.type === 'required' && <span> This field is required</span>}
              </div>

              <div className="flex flex-col pb-12 max-w-lg">
                <label className="text-gray-600">Protocol</label>
                <select
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
                  defaultValue={device.protocol}
                  name="protocol"
                  ref={register({ required: true })}
                  onChange={e => {
                    device.protocol = e.currentTarget.value;
                    setDevice({ ...device });
                  }}
                >
                  <option value={Protocols.HTTP}>HTTP</option>
                  <option value={Protocols.MQTT}>MQTT</option>
                </select>
                {errors.protocol?.type === 'required' && <span> This field is required</span>}
              </div>

              <ProtocolInputs device={device} setDevice={setDevice} register={register} />

              <div className="flex flex-col pb-12 max-w-lg">
                <label className="text-gray-600">Interval</label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
                  defaultValue={intervalAsSeconds(device.interval)}
                  type="number"
                  min="20"
                  name="interval"
                  ref={register({ required: true })}
                />
                {errors.interval?.type === 'required' && <span> This field is required</span>}
              </div>

              <div className="flex flex-col pb-12 w-full">
                <label className="text-gray-600">JSON Data</label>
                <div className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none">
                  {/* <JSONInput
                    id="a_unique_id"
                    placeholder={device.data}
                    locale={locale}
                    height="350px"
                    onChange={e => setValue('data', e.jsObject)}
                    theme="light_mitsuketa_tribute"
                    colors={{
                      keys: '#4a5568',
                      string: '#5D40B8',
                      number: '#667eea',
                      colon: '#4a5568',
                    }}
                  /> */}
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <NavLink
                  to="/"
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  type="submit"
                >
                  cancel
                </NavLink>
                <button
                  className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </form>
          </div>

          <div className="logs-container rounded-lg shadow-sm bg-gray-400 max-w-screen-md py-16 px-6 flex flex-col-reverse overflow-y-scroll overflow-x-hidden">
            {logs.map((log, index) => {
              return <span className="text-sm" key={index}><span className="font-medium">{log.time_stamp} [{log.severity}]:</span> <span className="ml-2">{log.text}</span></span>
            })}
          </div>
          </div>
        </div>
        <SnackbarComponent open={openSuccess} setOpen={setOpenSuccess} severity={'success'}>
          Successfully updated Device
        </SnackbarComponent>
        <SnackbarComponent open={openError} setOpen={setOpenError} severity={'error'}>
          { errorText }
        </SnackbarComponent>
      </DashboardLayout>
    </div>
    : null
  );
}

export default EditView;
