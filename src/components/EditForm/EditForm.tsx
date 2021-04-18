import moment from "moment";
import { Device, Protocols, Severity } from "../../types";
import { updateDevice } from '../../api';
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../context";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { DeviceToggleButton } from "../DeviceToggleButton";
import { ProtocolInputs } from "./ProtocolInputs";
import { IconContext } from "react-icons/lib";
import { HiOutlineClock } from "react-icons/hi";

export const EditForm = ({device, setDevice}: any) => {
    const { getAccessTokenSilently } = useAuth0();
    const [formValues, setFormValues] = useState<Partial<Device>>(device)
    const [protocol, setProtocol] = useState<Protocols>()
    console.log(device); 

    const openSnackbar = useContext(SnackbarContext)

    // Handle form change
    const handleChange = (event: any) => {
      const { name, value } = event.target
      if(name === 'protocol') {
        setProtocol(value as Protocols);
      }
      // Set values
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }))

      // set errors
      // const error = formValidation(name, value, fieldsValidation) || ""

      // setFormErrors({
      //   [name]: error
      // })
    }

    const getAccessToken = async () => {
        return await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
    }

    const handleSubmit = async (event: any) => {
      event.preventDefault();
      console.log(formValues);
        try {
          const newDevice = await updateDevice({...formValues, _id: device._id}, await getAccessToken());
          setDevice(newDevice.data);
          openSnackbar({open: true, severity: Severity.SUCCESS, text: 'successfully updated device'});
        } catch (error) {
          openSnackbar({open: true, severity: Severity.ERROR, text: 'could not update device'});
        }
    };

    
    return (
      formValues ?
      <form className="flex flex-col">
        <DeviceToggleButton className="w-24" device={device} setDevice={setDevice} />
        <div className="flex flex-row my-8">
          <div className="mr-12 w-3/6">
          <h2 className="text-gray-700 mb-4 text-xl font-medium">Device Settings</h2>
          <div className="grid grid-cols-2 gap-8">

            <TextField
              name="name"
              onChange={handleChange}
              defaultValue={formValues.name}
              label="Name" 
              className="col-span-2"
            />

            <FormControl className="col-span-2">
              <InputLabel>Protocol</InputLabel>
              <Select
                name="protocol"
                defaultValue={formValues.protocol}
                onChange={handleChange}
              >
                <MenuItem value={Protocols.HTTP}>HTTP</MenuItem>
                <MenuItem value={Protocols.MQTT}>MQTT</MenuItem>
              </Select>
            </FormControl>

            <TextField 
              name="interval"
              defaultValue={formValues.interval}
              onChange={handleChange}
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
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <ProtocolInputs formValues={formValues} handleChange={handleChange}  />
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
          onClick={handleSubmit}
        >
          save
        </button>
      </div>
    </form> : null
    );
}