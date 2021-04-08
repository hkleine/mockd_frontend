import moment from "moment";
import { Device, Protocols, Severity } from "../../types";
import { updateDevice } from '../../api';
import { useContext, useState } from "react";
import { SnackbarContext } from "../../context";
import { Controller, useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { DeviceToggleButton } from "../DeviceToggleButton";
import { ProtocolInputs } from "./ProtocolInputs";
import { IconContext } from "react-icons/lib";
import { HiOutlineClock } from "react-icons/hi";

export const EditForm = ({device, setDevice}: any) => {
    const { getAccessTokenSilently } = useAuth0();
    const openSnackbar = useContext(SnackbarContext)
    const [protocol, setProtocol] = useState<Protocols>(device.protocol);
    const { handleSubmit, register, control } = useForm<Device>();

    const getAccessToken = async () => {
        return await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
    }

    const intervalAsSeconds = (interval: string) => {
        return moment.duration(interval).asSeconds();
    };

    const onSubmit = async (data:Device) => {
      console.log(data);
        try {
          const newDevice = await updateDevice({...data, _id: device._id}, await getAccessToken());
          setDevice(newDevice.data);
          openSnackbar({open: true, severity: Severity.SUCCESS, text: 'successfully updated device'});
        } catch (error) {
          openSnackbar({open: true, severity: Severity.ERROR, text: 'could not update device'});
        }
    };

    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <DeviceToggleButton className="w-24" device={device} setDevice={setDevice} />
          <div className="flex flex-row my-8">
            <div className="mr-12 w-3/6">
            <h2 className="text-gray-700 mb-4 text-xl font-medium">Device Settings</h2>
            <div className="grid grid-cols-2 gap-8">
              <Controller
                control={control}
                name="name"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                    defaultValue={device.name}
                    label="Name" 
                    className="col-span-2"
                  />
                )}
              />
              <FormControl className="col-span-2">
                <InputLabel>Protocol</InputLabel>
                <Select
                  defaultValue={device.protocol}
                  {...register("protocol")}
                  onChange={e => {
                    setProtocol(e.target.value as Protocols)
                  }}
                >
                  <MenuItem value={Protocols.HTTP}>HTTP</MenuItem>
                  <MenuItem value={Protocols.MQTT}>MQTT</MenuItem>
              </Select>
              </FormControl>
              <Controller
                control={control}
                name="interval"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField 
                  InputProps={{
                    inputProps: { 
                      max: 60000, min: 20 
                    },
                    type: "number",
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div className="text-gray-600">
                                <HiOutlineClock />
                            </div>
                        </IconContext.Provider>
                      </InputAdornment>
                    ),
                    endAdornment: (<InputAdornment position="end">sec</InputAdornment>)
                  }}
                  label="Interval" 
                  defaultValue={intervalAsSeconds(device.interval)} 
                  onBlur={onBlur}
                  onChange={onChange}
                  inputRef={ref}
                />
                )}
              />
            </div>
            </div>

            <Divider orientation="vertical" flexItem />
            <ProtocolInputs device={device} protocol={protocol} register={register} control={control} />
          </div>
          


        <div className="flex flex-row justify-end">
          <NavLink
            to="/"
            className="bg-white mr-4 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            cancel
          </NavLink>
          <button
            className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow"
            type="submit"
          >
            save
          </button>
        </div>
      </form>
    );
}