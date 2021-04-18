import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { HttpMethods } from '../../types';


export function ProtocolInputs({ formValues, handleChange }: any) {
  const [showMqttPassword, setShowMqttPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowMqttPassword(!showMqttPassword);
  };

  const RenderSwitch = () => {
    switch (formValues.protocol) {
      case 'mqtt':
        return (
          formValues ?
          <div>
            <h2 className="text-gray-700 mb-4 text-xl font-medium col-span-2">Protocol Details</h2>
            <div className="grid grid-cols-2 gap-8">
              <TextField
                id="mqtt host input"
                label="MQTT Host" 
                className="col-span-2"
              />

              <TextField
                defaultValue={formValues.mqtt_topic}
                label="MQTT Topic" 
                className="col-span-2"
              />

              <TextField
                defaultValue={formValues.mqtt_username}
                label="MQTT Username" 
              />
  
              <TextField 
                label="MQTT Password" 
                type={showMqttPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showMqttPassword ? 
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                          <div className="text-gray-600">
                              <HiEye />
                          </div>
                        </IconContext.Provider> : 
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                        <div className="text-gray-600">
                            <HiEyeOff />
                        </div>
                      </IconContext.Provider>
                      }
                    </IconButton>
                  </InputAdornment>)
                }}
              />

            </div>
          </div>
          : null
        );
        case 'http':
          return (
            formValues ?
            <div>
              <h2 className="text-gray-700 mb-4 text-xl font-medium">Protocol Details</h2>
              <div className="grid grid-cols-1 gap-8">
                {/* HTTP HOST INPUT  */}
                <TextField
                  defaultValue={formValues.http_host}
                  label="HTTP Host" 
                />


                {/* HTTP METHOD INPUT  */}
                
                    <FormControl >
                      <InputLabel>HTTP Method</InputLabel>
                      <Select
                        defaultValue={formValues.http_method}
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                      >
                        <MenuItem value={HttpMethods.POST}>POST</MenuItem>
                        <MenuItem value={HttpMethods.PUT}>PUT</MenuItem>
                        <MenuItem value={HttpMethods.PATCH}>PATCH</MenuItem>
                      </Select>
                    </FormControl>

                
                {/* HTTP AUTH HEADER INPUT  */}
                {/* <Controller
                    control={control}
                    name="http_host"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <TextField
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={ref}
                        defaultValue={device.http_host}
                        label="HTTP Auth Header" 
                      />
                    )}
                /> */}
    
              </div>
            </div>
            : null
          );
        default:
          return null;
    }
  }
  
  return (
    <div className="ml-12 w-3/6">{RenderSwitch()}</div>
  );
}
