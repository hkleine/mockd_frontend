import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {Loading, ProtocolInputs, SnackbarComponent} from '../components';
import { useForm } from "react-hook-form";
import moment from 'moment';
import 'jsoneditor-react/es/editor.min.css';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import { NavLink } from 'react-router-dom';

function EditView({ match }) {
  let params = match.params;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);
  const [sensor, setSensor] = useState();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const { handleSubmit, register, errors, setValue } = useForm();

  const onSubmit = async (data) => {
    await updateDevice(data);
  };

  const updateDevice = async (newSensor) => {  
    newSensor.interval = `PT${newSensor.interval}S`;
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
  
      const response = await axios({ 
        method: 'patch', 
        url: `${process.env.REACT_APP_API}/api/device/${params.id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: newSensor
      });
      setSensor(response.data);
      setValue('data', response.data.data)
      setLoading(false);
      setOpenSuccess(true);
    } catch (e) {
      setLoading(false);
      setOpenError(true);
      console.log(e.message);
    }
  };

  const getDevice = async () => {  
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
  
      const response = await axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/device/${params.id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSensor(response.data);
      setValue('data', response.data.data)
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const intervalAsSeconds = (interval) => {
    return moment.duration(interval).asSeconds();
  }

  useEffect(() => {
    register({ name: "data"});
    
    getDevice();
  }, [register]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col pb-12">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium pb-12">Edit {sensor.name}</h1>
          </div> 
          <div className="rounded-lg overflow-hidden shadow-sm bg-white p-4 max-w-screen-md p-16">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col pb-12 max-w-lg">
              <label className="text-gray-600">Name</label>
              <input 
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" 
                defaultValue={sensor.name} 
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
                defaultValue={sensor.protocol} 
                name="protocol" 
                ref={register({ required: true })}
                onChange={(e) => {
                  sensor.protocol = e.currentTarget.value;
                  setSensor({...sensor});
                }}
              >
                <option value="http">HTTP</option>
                <option value="mqtt">MQTT</option>
              </select>
              {errors.protocol?.type === 'required' && <span> This field is required</span>}
            </div>

            <ProtocolInputs sensor={sensor} setSensor={setSensor} register={register} />

            <div className="flex flex-col pb-12 max-w-lg">
              <label className="text-gray-600">Interval</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={intervalAsSeconds(sensor.interval)} type="number" min="20" name="interval" ref={register({ required: true })} />
              {errors.interval?.type === 'required' && <span> This field is required</span>}
            </div>

            <div className="flex flex-col pb-12 w-full">
              <label className="text-gray-600">JSON Data</label>
              <div className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none">
              <JSONInput
                  id          = 'a_unique_id'
                  placeholder = { sensor.data }
                  locale      = { locale }
                  height      = '350px'
                  onChange = {(e) => setValue('data', e.jsObject)}
                  theme = 'light_mitsuketa_tribute'
                  colors = {{
                    keys: '#4a5568',
                    string: '#5D40B8',
                    number: '#667eea',
                    colon: '#4a5568',
                  }}
              />
              </div>
            </div>
            
            <div className="flex flex-row justify-between">
              <NavLink to="/" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">cancel</NavLink>
              <button className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow" type="submit" >submit</button>
            </div>
          </form>
          </div>
        </div>
        <SnackbarComponent open={openSuccess} setOpen={setOpenSuccess} severity={"success"}>
          Successfully updated Device
        </SnackbarComponent>
        <SnackbarComponent open={openError} setOpen={setOpenError} severity={"error"}>
          Error while updating Device
        </SnackbarComponent>
      </DashboardLayout>
    </div>
  );
}

export default EditView;
