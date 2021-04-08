import React, { Fragment, useContext } from "react"
import Button from "@material-ui/core/Button"
import { TextField } from "@material-ui/core"
import { useAuth0 } from '@auth0/auth0-react';
import { omitBy, isEmpty } from 'lodash';
import {createDevice} from '../../api'
import { SubmitButton } from '..'
import { SnackbarContext } from "../../context";
import { Severity } from "../../types";
import { SecondaryButton } from "../SecondaryButton";


// Destructuring props
const ThirdStep = ({ handleNext, handleBack, handleChange, values }: any) => {
  const { name } = values
  // Check if all values are not empty or if there are some error
  const isValid = name.length > 0;
  const { getAccessTokenSilently } = useAuth0();
  const openSnackbar = useContext(SnackbarContext)

  const handleSubmit = async () => {
    // Do whatever with the values
    values = omitBy(values, isEmpty);
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    try {
      await createDevice(values, accessToken);
      handleNext();
      openSnackbar({open: true, severity: Severity.SUCCESS, text: 'successfully created device'});
    } catch (e) {
      console.log(e.message);
      handleNext();
      openSnackbar({open: true, severity: Severity.ERROR, text: 'an error occured during device creation'});
    }
  }

  return (
    <Fragment>
        <TextField
            fullWidth
            label="Device Name"
            name="name"
            value={name || ""}
            margin="normal"
            onChange={handleChange}
            // error={!!formErrors.city}
            // helperText={formErrors.city}
            required
          />
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <SecondaryButton className="mr-4" onClick={handleBack}>
          back
        </SecondaryButton>
        <SubmitButton isValid={isValid} onClick={handleSubmit}>submit</SubmitButton>
      </div>
    </Fragment>
  )
}

export default ThirdStep
