import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {Loading} from '../components';
import { useForm } from "react-hook-form";
import moment from 'moment';
import 'jsoneditor-react/es/editor.min.css';
import ReactJson from 'react-json-view';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

function EditView({ match }) {
  let params = match.params;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);
  const [sensor, setSensor] = useState();
  const { handleSubmit, register, errors, setValue } = useForm();
  const onSubmit = data => {

    console.log(data);
  };

  function intervalAsSeconds(interval) {
    return moment.duration(interval).asSeconds();
  }

  function ProtocolInputs({ sensor }) {
    switch (sensor.protocol) {
      case 'mqtt':
        return (
          <div>
            <div className="flex flex-col pb-12 max-w-lg">
              <label className="text-gray-600">MQTT Host</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={sensor.mqtt_host} type="text" name="mqtt_host" ref={register()} />
            </div>
            
            <div className="flex flex-col pb-12 max-w-lg">
              <label className="text-gray-600">MQTT Topic</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={sensor.mqtt_topic} type="text" name="mqtt_topic" ref={register()} />
            </div>

            <div className="flex flex-row pb-12 max-w-lg">
              <div className="flex flex-col w-1/2">
                <label className="text-gray-600">MQTT Username</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={sensor.mqtt_username} type="text" name="mqtt_username" ref={register()} />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-gray-600">MQTT Password</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={sensor.mqtt_password} type="password" name="mqtt_password" ref={register()} />
              </div>
            </div>
          </div>
        );
      case 'http':
        return <div>http</div>;
      default:
        return null;
    }
  }

  useEffect(() => {
    register({ name: "data"});

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

            <ProtocolInputs sensor={sensor} />

            <div className="flex flex-col pb-12 max-w-lg">
              <label className="text-gray-600">Interval</label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" defaultValue={intervalAsSeconds(sensor.interval)} type="number" min="20" name="interval" ref={register({ required: true })} />
              {errors.interval?.type === 'required' && <span> This field is required</span>}
            </div>

            <div className="flex flex-col pb-12 w-full">
              <label className="text-gray-600">JSON Data</label>
              <div className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none">
              {/* <ReactJson src={sensor.data} onEdit={(e) => setValue('data', e.updated_src)} /> */}
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
                    number: '#667eea'
                  }}
              />
              </div>
            </div>

            <button type="submit">submit</button>
          </form>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default EditView;
