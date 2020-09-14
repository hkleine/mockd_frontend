import React, { useRef, useEffect, useState } from "react";
import LogoutButton from "./logout-button";
import OutsideAlerter from "./outside-alerter";



const Header = ({user}) => {
    const menu = useRef();
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = React.useCallback(() => setIsOpen(!isOpen))

    useEffect(() => {
        if (isOpen) {
          document.addEventListener("mousedown", handleClick);
        } else {
          document.removeEventListener("mousedown", handleClick);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, [isOpen]);

    const handleClick = e => {
        if (menu.current && menu.current.contains(e.target)) {
            return;
        }
        // outside click 
        toggleMenu();
    };

    return (
        <header class="flex w-full h-24 justify-between items-center py-4 px-6 bg-white border-b-2 border-grey-600">
        <div class="flex items-center">
            <button class="text-gray-500 focus:outline-none lg:hidden">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
                <input class="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600" type="text" placeholder="Search" />
            </div>
        </div>

        <div class="flex items-center">
        <span class="relative mr-8">
            {user.name}
        </span>
            <div class="relative" ref={menu}>
                <button class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none" onClick={toggleMenu}>
                    <img class="h-full w-full object-cover" src={user.picture} alt="Your avatar" />
                </button>
                {isOpen && (
                <div class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                    <LogoutButton />
                </div>
            )}
            </div>
        </div>
    </header>
    );
}
    
export default Header;
