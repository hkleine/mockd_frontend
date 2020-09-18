import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HiOutlineLogout } from 'react-icons/hi'
import { IconContext } from 'react-icons';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      className="text-lg mb-8 font-medium flex w-48 items-center py-2 px-6 bg-white bg-opacity-25 text-gray-600 rounded-full"
    >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <HiOutlineLogout />
          </div>
        </IconContext.Provider>
        <span className="ml-6">Logout</span>
    </button>
  );
};

export default LogoutButton;
