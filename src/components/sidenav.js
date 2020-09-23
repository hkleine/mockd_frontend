import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineBell, HiOutlineChartBar, HiOutlineUser } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import LogoutButton from './logout-button';
import Logo from './Logo'

const SideNav = () => (
  <div className="fixed z-30 inset-y-0 left-0 h-screen transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
    <Logo className="m-auto" />
    <nav className="mt-24 pl-8 pr-24">
      <NavLink
        to="/"
        exact
        className="text-lg mb-8 font-medium flex w-48 items-center py-2 px-6 bg-white text-gray-600 rounded-full"
        activeStyle={{ color: '#5D40B8', background: '#f2f5f9'}}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <HiOutlineViewGrid />
          </div>
        </IconContext.Provider>
        <span className="ml-6">Dashboard</span>
      </NavLink>
      <NavLink
        to="/alerts"
        className="text-lg mb-8 font-medium flex w-48 items-center py-2 px-6 bg-white text-gray-600 rounded-full"
        activeStyle={{ color: '#5D40B8', background: '#F9FBFD'}}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <HiOutlineBell />
          </div>
        </IconContext.Provider>
        <span className="ml-6">Alerts</span>
      </NavLink>
      <NavLink
        to="/statistics"
        className="text-lg mb-8 font-medium flex w-48 items-center py-2 px-6 bg-white text-gray-600 rounded-full"
        activeStyle={{ color: '#5D40B8', background: '#f2f5f9'}}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <HiOutlineChartBar />
          </div>
        </IconContext.Provider>

        <span className="ml-6">Statistics</span>
      </NavLink>
      <NavLink
        to="/profile"
        className="text-lg mb-8 font-medium flex w-48 items-center py-2 px-6 bg-white text-gray-600 rounded-full"
        activeStyle={{ color: '#5D40B8', background: '#f2f5f9'}}
      >
        <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
          <div>
            <HiOutlineUser />
          </div>
        </IconContext.Provider>

        <span className="ml-6">Profile</span>
      </NavLink>
      <LogoutButton />
    </nav>
  </div>
);

export default SideNav;
