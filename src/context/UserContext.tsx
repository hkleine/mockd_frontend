import { User } from '@auth0/auth0-react/dist/auth-state';
import React, { useState } from 'react'


const UserContext = React.createContext<User>({});

const UserProvider = ({ user, children }:any) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }