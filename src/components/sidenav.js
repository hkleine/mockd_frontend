import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaThLarge, FaBell, FaChartBar } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const SideNav = () => (
  <div class="fixed z-30 inset-y-0 left-0 w-64 h-screen transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
    <nav class="mt-10">
      <NavLink
        to="/"
        exact
        className="text-lg mb-8 font-medium flex items-center mt-4 py-2 px-6 border-l-4 bg-white bg-opacity-25 text-gray-600 border-white "
        activeStyle={{ color: '#5D40B8', borderColor: '#5D40B8' }}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <FaThLarge />
          </div>
        </IconContext.Provider>
        <span class="mx-4 text-gray-800">Dashboard</span>
      </NavLink>
      <NavLink
        to="/add"
        className="text-lg font-medium mb-8 flex items-center mt-4 py-2 px-6 border-l-4 bg-white bg-opacity-25 text-gray-600 border-white"
        activeStyle={{ color: '#2210FE', borderColor: '#2210FE' }}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <FaBell />
          </div>
        </IconContext.Provider>
        <span class="mx-4">Alerts</span>
      </NavLink>
      <NavLink
        to="/add"
        className="text-lg font-medium flex items-center mt-4 py-2 px-6 border-l-4 bg-white bg-opacity-25 text-gray-600 border-white"
        activeStyle={{ color: '#2210FE', borderColor: '#2210FE' }}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <FaChartBar />
          </div>
        </IconContext.Provider>

        <span class="mx-4">Statistics</span>
      </NavLink>
    </nav>
  </div>
);

export default SideNav;
