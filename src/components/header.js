import React from "react";
import Searchbar from "./Searchbar"


const Header = ({user}) => {
    return (
      <header className="flex w-full justify-between items-center py-8 pr-20 pl-12 bg-gray-200 bg-opacity-75">
        <Searchbar />
        <div className="flex items-center">
          <img className="relative w-16 h-16 rounded-full shadow-md" src={user.picture} alt="Your avatar" />
          <span className="relative ml-6 text-gray-700">
            {user.name}
          </span>
        </div>
      </header>
    );
}

export default Header;
