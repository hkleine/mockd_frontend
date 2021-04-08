import { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toggleDevice } from '../api'
import { SnackbarContext } from "../context";
import { Severity } from '../types';
import { FormControlLabel, Switch } from '@material-ui/core';


export const DeviceToggleButton = ({device, setDevice}: any) => {
    const [checked, setChecked] = useState<boolean>(device.is_running)
    const { getAccessTokenSilently } = useAuth0();
    const openSnackbar = useContext(SnackbarContext)

    async function handleToggleDevice() {
        setChecked(!checked)
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        try {
            const response = await toggleDevice(device._id, accessToken)
            setDevice(response.data);
            if(response.data.is_running) {
                openSnackbar({open: true, severity: Severity.INFO, text: 'started device'});
            } else {
                openSnackbar({open: true, severity: Severity.INFO, text: 'stopped device'});
            }
        } catch (error) {
            openSnackbar({open: true, severity: Severity.ERROR, text: 'failed to toggle device'});
        }
    }

    return (
        <div>
            <Switch
                checked={checked}
                onChange={handleToggleDevice}
                name="device toggle"
                color="primary"
                className="w-20"
            />
            <span className="text-gray-600 text-sm">running</span>
        </div>

    );
};