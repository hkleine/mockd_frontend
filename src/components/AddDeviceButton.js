import React from "react";
import { HiOutlinePlus } from 'react-icons/hi';
import { IconContext } from 'react-icons';

const AddDeviceButton = () => {
  return (
    <button className="max-w-sm rounded-lg outline-none overflow-hidden text-gray-700 shadow-sm bg-white p-4 flex flex-col justify-center ">
        <IconContext.Provider value={{ style: { fontSize: '70px' } }}>
            <div className="m-auto">
                <HiOutlinePlus />
            </div>
        </IconContext.Provider>
      <span className="m-auto">Add New Device</span>
    </button>
  );
};

export default AddDeviceButton;