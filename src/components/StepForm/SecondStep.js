import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
const SecondStep = ({ handleNext, handleBack, handleChange, values: { protocol, mqtt_host, mqtt_password, mqtt_topic, mqtt_username, http_host, http_port, http_method, http_auth_token }, formErrors }) => {
  // Check if all values are not empty or if there are some error
  const isValid = (mqtt_host.length > 0 && mqtt_username.length > 0 && mqtt_topic.length > 0) || (http_host.length > 0 && http_port.length > 0 && http_method.length > 0 && http_auth_token.length > 0);

  function NextButton() {
    if (isValid) {
      return <button className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow" disabled={!isValid} onClick={isValid ? handleNext : null} type="submit">Next</button>;
    }
    return <button className="bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-10 rounded shadow" disabled type="submit">Next</button>;
  }

  return (
    <>
    {protocol === 'MQTT' ? (
      <>
        <h2 className="text-gray-700 text-2xl font-medium pb-2">MQTT Destination</h2>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="MQTT Host"
            name="mqtt_host"
            value={mqtt_host || ""}
            placeholder="e.g test.dummymqtt.com:1111"
            margin="normal"
            onChange={handleChange}
            // error={!!formErrors.city}
            // helperText={formErrors.city}
            required
          />
          <TextField
            fullWidth
            label="MQTT Topic"
            name="mqtt_topic"
            value={mqtt_topic || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="MQTT Username"
            name="mqtt_username"
            value={mqtt_username || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            label="MQTT Password"
            name="mqtt_password"
            placeholder="password"
            value={mqtt_password || ""}
            onChange={handleChange}
            // error={!!formErrors.phone}
            // helperText={formErrors.phone}
            margin="normal"
          />
        </Grid>
        <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
            <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 10 }}>
              Back
            </Button>
            <NextButton />
          </div>
        </>
        ) : (
          <>
            <h2 className="text-gray-700 text-2xl font-medium pb-2">HTTP Destination</h2>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="HTTP Host"
                name="http_host"
                value={http_host || ""}
                placeholder="e.g testhttp.com:1111"
                margin="normal"
                onChange={handleChange}
                // error={!!formErrors.city}
                // helperText={formErrors.city}
                required
              />
              <TextField
                type="number"
                fullWidth
                label="HTTP Port"
                name="http_port"
                value={http_port || ""}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="HTTP Method"
                name="http_method"
                value={http_method || ""}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="HTTP Authtoken"
                name="http_auth_token"
                value={http_auth_token || ""}
                onChange={handleChange}
                // error={!!formErrors.phone}
                // helperText={formErrors.phone}
                margin="normal"
              />
            </Grid>
              <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
                <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 10 }}>
                  Back
                </Button>
                <NextButton />
              </div>
          </> 
        )}
    </>
  )}

export default SecondStep
