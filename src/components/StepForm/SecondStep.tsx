import Grid from "@material-ui/core/Grid"
import {TextField, Select, MenuItem, FormControl, InputLabel} from "@material-ui/core"
import { HttpMethods } from '../../types'
import { SubmitButton } from '..'
import { SecondaryButton } from "../SecondaryButton"


// Destructuring props
const SecondStep = ({ handleNext, handleBack, handleChange, values: { protocol, mqtt_host, mqtt_password, mqtt_topic, mqtt_username, http_host, http_method, http_auth_token }, formErrors }: any) => {
  // Check if all values are not empty or if there are some error
  const isValid = (mqtt_host.length > 0 && mqtt_username.length > 0 && mqtt_topic.length > 0) || (http_host.length > 0 && http_method.length > 0);

  return (
    <>
    {protocol === 'mqtt' ? (
      <>
        <h2 className="text-gray-700 text-2xl font-medium pb-2">MQTT Destination</h2>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="MQTT Host"
            name="mqtt_host"
            value={mqtt_host || ""}
            placeholder="e.g test.dummymqtt.com:1111"
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
          />
        </Grid>
        <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
            <SecondaryButton className="mr-4" onClick={handleBack}>
              back
            </SecondaryButton>
            <SubmitButton isValid={isValid} onClick={handleNext}>next</SubmitButton>
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
                onChange={handleChange}
                // error={!!formErrors.city}
                // helperText={formErrors.city}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">HTTP Method *</InputLabel>
              <Select
                fullWidth
                label="HTTP Method"
                name="http_method"
                value={http_method}
                onChange={handleChange}
                required
              >
                <MenuItem value={HttpMethods.POST}>POST</MenuItem>
                <MenuItem value={HttpMethods.PUT}>PUT</MenuItem>
                <MenuItem value={HttpMethods.PATCH}>PATCH</MenuItem>
              </Select>
            </FormControl>
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
              />
            </Grid>
              <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
                <SecondaryButton className="mr-4" onClick={handleBack}>
                  back
                </SecondaryButton>
                <SubmitButton isValid={isValid} onClick={handleNext}>next</SubmitButton>
              </div>
          </> 
        )}
    </>
  )}

export default SecondStep
