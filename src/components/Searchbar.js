import React from "react";
import { HiOutlineSearch } from 'react-icons/hi';
import { IconContext } from 'react-icons';


const Searchbar = () => {
  return (
    <div class="p-8">
        <div class="bg-white flex items-center rounded-full shadow-sm">
            <input class="rounded-l-full w-64 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />
            <div>
                <span class="text-gray-700 rounded-full p-2 focus:outline-none w-12 h-12 flex items-center justify-center">
                    <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                    <div>
                        <HiOutlineSearch />
                    </div>
                    </IconContext.Provider>
                </span>
            </div>
        </div>
    </div>  )
};

export default Searchbar;