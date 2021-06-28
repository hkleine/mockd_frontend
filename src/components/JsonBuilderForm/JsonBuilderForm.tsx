import React, { useContext, useState } from "react"
import { HiOutlinePlus } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { KeyValueInput } from './KeyValueInput'
import { JsonBuilderViewer } from "./JsonViewer";
import { SecondaryButton } from "../SecondaryButton";
import { PrimaryButton } from "../PrimaryButton";
import { updateDevice } from "../../hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { SnackbarContext } from "../../context";
import { Severity } from "../../types";

export const JsonBuilderForm = ({device, setDevice}:any) => {
    const { getAccessTokenSilently } = useAuth0();
    const openSnackbar = useContext(SnackbarContext);
    const [data, setData] = useState(device.data || {});

    const saveData = async () => {
        try {
            const newDevice = await updateDevice({data: data, _id: device._id}, await getAccessTokenSilently({audience: process.env.REACT_APP_AUTH0_AUDIENCE}));
            setDevice(newDevice.data);
            openSnackbar({open: true, severity: Severity.SUCCESS, text: 'successfully updated device'});
        } catch (error) {
            openSnackbar({open: true, severity: Severity.ERROR, text: 'could not update device'});
        }
    }

    const addNewKeyValuePairs = () => {
        const newData:any = {}
        newData[""] = ""
        setData({...data, ...newData})
    }

    const updateObjKey = (oldKey: string, value: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        delete data[oldKey]
        data[event.target.value] = value;
        setData({...data});
    }

    const deleteProperty = (keyToDelete: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        delete data[keyToDelete]
        setData({...data});
    }

    const updateValue = (key: string, type:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(type);
        // transforming solltei neigene methode vllt sogar helper
        switch(type) {
            case "number":
                data[key] = Number(event.target.value);
                break;
            case "boolean":
                data[key] = event.target.value === 'true'
            break;
            default:
                data[key] = event.target.value;
          }
        setData({...data});
    }

    const keyValueInputs = []

    for (const [key, value] of Object.entries(data)) {
        keyValueInputs.push(<KeyValueInput objKey={key} updateObjKey={updateObjKey} deleteProperty={deleteProperty} value={value} updateValue={updateValue} />)
    }

    return (
        <div>
            <JsonBuilderViewer data={data} />
            <div className="grid grid-cols-1 gap-4 mt-8">
                {keyValueInputs}
                <div className="flex flex-row justify-between">
                    <SecondaryButton onClick={addNewKeyValuePairs}>
                        <div className="flex flex-row">
                            <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
                                <div className="m-auto text-gray-700">
                                    <HiOutlinePlus />
                                </div>
                            </IconContext.Provider>
                            <span>add</span> 
                        </div>
                    </SecondaryButton>
                    <PrimaryButton onClick={saveData}>
                        save
                    </PrimaryButton>
                </div>
            </div>
        </div> 
    );
}
