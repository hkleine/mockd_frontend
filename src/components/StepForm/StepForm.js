import React, { useState } from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"
import Success from "./Success"
import formValidation from "./Helper/formValidation"
 
// Step titles
const labels = ["First Step", "Second Step", "Third Step"]

const defaultDevice = {
  name: "",
  protocol: "",
  interval: "",
  mqtt_host: "",
  mqtt_username: "",
  mqtt_password: "",
  mqtt_topic: "",
  data: [],
  http_host: "",
  http_port: 0,
  http_method: "",
  http_auth_token: "",
};

const fieldsValidation = {
  name: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  protocol: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  http_host: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  http_port: {
    error: "",
    validate: "number",
  },
  http_method: {
    error: "",
    validate: "method",
    minLength: 2,
    maxLength: 20
  },
  http_auth_token: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 80
  },
  mqtt_host: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  mqtt_username: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  mqtt_password: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  mqtt_topic: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  email: {
    error: "",
    validate: "email"
  },
  gender: {},
  date: {},
  city: {
    error: "",
    validate: "text",
    minLength: 3,
    maxLength: 20
  },
  interval: {
    error: "",
    validate: "number",
    maxLength: 15
  }
}

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formValues, setFormValues] = useState(defaultDevice)
  const [formErrors, setFormErrors] = useState({})

  // Proceed to next step
  const handleNext = () => setActiveStep(prev => prev + 1)
  // Go back to prev step
  const handleBack = () => setActiveStep(prev => prev - 1)

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target

    // Set values
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))

    // set errors
    const error = formValidation(name, value, fieldsValidation) || ""

    setFormErrors({
      [name]: error
    })
  }

  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStep handleNext={handleNext} handleChange={handleChange} values={formValues} formErrors={formErrors} />
        )
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 2:
        return <ThirdStep handleNext={handleNext} handleChange={handleChange} handleBack={handleBack} values={formValues} />
      default:
        break
    }
  }

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white p-12">
    <Stepper activeStep={activeStep} alternativeLabel>
      {labels.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <div className="mt-8">
      {handleSteps(activeStep)}
    </div>
    </div>
  )
}

export default StepForm
