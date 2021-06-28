import { useQuery } from "react-query";
import { GetDevices } from "./api";

export const useDevices = () => {

    const { 
        isLoading, 
        isSuccess, 
        error, 
        isError, 
        data: devicesData 
     } = useQuery("devices", GetDevices);
     
     return {isLoading, isSuccess, error, isError, devicesData}
}