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
        <header className="flex w-full h-24 justify-between items-center py-4 px-6 bg-gray-100 bg-opacity-75">

        <div className="flex items-center">

            <div className="relative w-12 h-12 rounded" ref={menu}>
                <img className="h-full w-full object-cover" src={user.picture} alt="Your avatar" />
            </div>
            <span className="relative ml-8">
            {user.name}
        </span>
        </div>
    </header>
    );
}
    
export default Header;
