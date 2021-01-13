import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import { FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core"

// Destructuring props
const ThirdStep = ({ handleNext, handleBack, handleChange, values }) => {
  const { protocol, mqtt_host, mqtt_password, mqtt_topic, mqtt_username, http_host, http_port, http_method, http_auth_token, name } = values
  // Check if all values are not empty or if there are some error
  const isValid = name.length > 0;

  const handleSubmit = () => {
    // Do whatever with the values
    console.log(values)
    // Show last compinent or success message
    handleNext()
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
      <button className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow" onClick={handleSubmit} type="submit">
        submit
      </button>
      </div>
    </Fragment>
  )
}

export default ThirdStep
