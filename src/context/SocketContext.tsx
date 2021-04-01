import React from 'react'
import {io} from 'socket.io-client'

const socket = io(process.env.REACT_APP_API!, {
    transports: ['websocket'], upgrade: false
});
const SocketContext = React.createContext(socket);


const SocketProvider = ({ children }:any) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }