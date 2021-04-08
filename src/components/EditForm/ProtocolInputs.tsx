import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { HttpMethods } from '../../types';


export function ProtocolInputs({ device, protocol, register, control }: any) {
  const [showMqttPassword, setShowMqttPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowMqttPassword(!showMqttPassword);
  };
  
  switch (protocol) {
    case 'mqtt':
      return (
        <div className="ml-12 w-3/6">
          <h2 className="text-gray-700 mb-4 text-xl font-medium col-span-2">Protocol Details</h2>
          <div className="grid grid-cols-2 gap-8">

            <Controller
              control={control}
              name="mqtt_host"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  onBlur={onBlur}
                  onChange={onChange}
                  inputRef={ref}
                  defaultValue={device.mqtt_host}
                  label="MQTT Host" 
                  className="col-span-2"
                />
              )}
              />

              <Controller
                control={control}
                name="mqtt_topic"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                    defaultValue={device.mqtt_topic}
                    label="MQTT Topic" 
                    className="col-span-2"
                  />
                )}
              />

              
              <Controller
                control={control}
                name="mqtt_username"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                    defaultValue={device.mqtt_username}
                    label="MQTT Username" 
                  />
                )}
              />

              <Controller
                control={control}
                name="mqtt_password"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField 
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                    label="MQTT Password" 
                    type={showMqttPassword ? 'text' : 'password'}
                    autoComplete 
                    defaultValue={device.mqtt_password} 
                    {...register("mqtt_password")}
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
                )}
              />

          </div>
        </div>

      );
    case 'http':
      return (
        <div className="ml-12 w-3/6">
          <h2 className="text-gray-700 mb-4 text-xl font-medium">Protocol Details</h2>
          <div className="grid grid-cols-1 gap-8">
            {/* HTTP HOST INPUT  */}
            <Controller
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
                      label="HTTP Host" 
                    />
                  )}
            />

            {/* HTTP METHOD INPUT  */}
            <FormControl >
              <InputLabel>HTTP Method</InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                defaultValue={device.http_method}
                {...register("http_method")}
              >
                <MenuItem value={HttpMethods.POST}>POST</MenuItem>
                <MenuItem value={HttpMethods.PUT}>PUT</MenuItem>
                <MenuItem value={HttpMethods.PATCH}>PATCH</MenuItem>
              </Select>
            </FormControl>
            
            {/* HTTP AUTH HEADER INPUT  */}
            <Controller
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
            />

          </div>
        </div>

      );
    default:
      return null;
  }
}
