import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getLogs } from "../hooks";
import { Log } from "../types";

export const DeviceLog = ({device}:any) => {
    const { getAccessTokenSilently } = useAuth0();
    const [logs, setLogs] = useState<Log[]>();
    const socket = io(process.env.REACT_APP_API!, {
        transports: ['websocket'], 
        upgrade: false
    });

    useEffect(() => {
        (async () => {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          });

          setLogs((await getLogs(device._id, accessToken)).reverse())
        })();
      }, [getAccessTokenSilently, device._id]);

    useEffect(() => {
        console.log(socket);
        socket.on('connect', () => {
            console.log("connected");
        });
        
        // Listens for incoming messages
        socket.on(device._id, (log: Log) => {
            console.log("received new log");
            setLogs(prevLogs => [log, ...prevLogs as Log[]]);
        });

        return () => {
            console.log("disconnecting");
            socket.disconnect();
        };
    }, [device._id, socket]);

    return (
        device && logs ?
        <div className="logs-container rounded-lg shadow-sm bg-gray-900 text-gray-300 max-w-screen-md py-16 px-6 flex flex-col-reverse overflow-y-scroll overflow-x-hidden">
            {logs.map((log: Log, index: number) => {
            return <span className="text-sm" key={index}><span className="font-medium">{log.time_stamp} [{log.severity}]:</span> <span className="ml-2">{log.text}</span></span>
            })}
      </div>: null
    );
}