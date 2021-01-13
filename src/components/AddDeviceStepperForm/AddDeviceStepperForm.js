
import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Protocols from "./Protocols";


const steps = [
  { id: "protocol" },
  { id: "connectionInfo" },
  { id: "data" },
];

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

const AddDeviceStepperForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultDevice);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "protocol":
      return <Protocols {...props} />;
    case "connectionInfo":
      return <Protocols {...props} />;
    case "data":
      return <Protocols {...props} />;

    default:
      return null;
  }
};

export default AddDeviceStepperForm;