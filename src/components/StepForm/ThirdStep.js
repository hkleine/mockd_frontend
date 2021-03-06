import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { TextField } from "@material-ui/core"
import { useAuth0 } from '@auth0/auth0-react';
import { omitBy, isEmpty } from 'lodash';
import {createDevice} from '../../api'
import { SubmitButton } from '../'


// Destructuring props
const ThirdStep = ({ handleNext, handleBack, handleChange, values }) => {
  const { name } = values
  // Check if all values are not empty or if there are some error
  const isValid = name.length > 0;
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    // Do whatever with the values
    values = omitBy(values, isEmpty);
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    try {
      await createDevice(values, accessToken);
      handleNext(true);
    } catch (e) {
      console.log(e.message);
      handleNext(false);
    }
  }

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
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
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
      <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 10 }}>
        Back
      </Button>
      <SubmitButton isValid={isValid} onClick={handleSubmit}>submit</SubmitButton>
      </div>
    </Fragment>
  )
}

export default ThirdStep
