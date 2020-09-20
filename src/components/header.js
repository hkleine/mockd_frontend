import React, { useRef, useEffect, useState } from "react";
import LogoutButton from "./logout-button";
import OutsideAlerter from "./outside-alerter";



const Header = ({user}) => {
  console.log(user);
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
        <header className="flex w-full justify-end items-center py-4 px-20 bg-gray-100 bg-opacity-75">
            <img className="relative w-16 h-16 rounded-full shadow-md" src={user.picture} alt="Your avatar" />
            <span className="relative ml-6">
            {user.name}
        </span>
    </header>
    );
}
    
export default Header;
