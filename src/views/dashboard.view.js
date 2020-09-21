import React, { useState, useEffect } from "react";
import {DashboardLayout} from "../layouts";
import { AddDeviceStepperForm } from '../components/AddDeviceStepperForm';
import { SensorGrid } from '../components';
import Modal from 'react-modal';
import axios from 'axios';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useAuth0 } from "@auth0/auth0-react";


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth0();
  const [sensors, setSensors] = React.useState();

  useEffect(() => {
    axios({ method: 'get', url: `${process.env.REACT_APP_API}/api/user/${user.sub}/devices` })
    .then(response => {
      console.log(response.data);
      setSensors(response.data);
      setLoading(false);
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  if (isLoading) {
    return (
      <div>
        <DashboardLayout>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-700 text-2xl font-medium">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center align-center justify-center pt-24">              
            <ClimbingBoxLoader
              color={"#5D40B8"}
              loading={isLoading}
            />
          </div>
        </DashboardLayout>
      </div>
    );
  }

  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-gray-700 text-2xl font-medium">Dashboard</h1>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="New Device"
            >
              <AddDeviceStepperForm />
            </Modal>
          </div>
          <SensorGrid sensors={sensors} />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
