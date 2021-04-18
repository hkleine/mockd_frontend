import { FormControl, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { ValueInput } from "./ValueInput";

export const KeyValueInput = ({objKey, updateObjKey, deleteProperty, value, updateValue}:any) => {
    const [type, setType] = useState<string>(typeof value);

    const handleTypeChange = (event: any) => {
        setType(event.target.value);
        console.log(type);
    }

    return (
        <Grid className="grid grid-rows-1 grid-cols-8 grid-flow-col gap-4">
            <TextField className="col-span-3" defaultValue={objKey} onChange={updateObjKey(objKey, value)} label="Key" variant="outlined" />
            <FormControl className="col-span-2" variant="outlined">
                <Select
                    defaultValue={type}
                    onChange={handleTypeChange}
                >
                    <MenuItem value={"string"}>String</MenuItem>
                    <MenuItem value={"number"}>Number</MenuItem>
                    <MenuItem value={"boolean"}>Boolean</MenuItem>
                    <MenuItem value={"timestamp"}>Timestamp</MenuItem>
                    <MenuItem value={"object"}>Object</MenuItem>
                    <MenuItem value={"array"}>Array</MenuItem>
                    <MenuItem value={"danymicValue"}>DynamicValue</MenuItem>
                </Select>
            </FormControl>
            
            <ValueInput className="col-span-3" value={value} type={type} objKey={objKey} updateValue={updateValue} />
            {/* <TextField className="col-span-3" defaultValue={value} onChange={updateValue(objKey)} label="Value" variant="outlined" /> */}

            <button className="pb-2" onClick={deleteProperty(objKey)}>
                <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                    <div className="text-gray-600 hover:text-purple-700">
                        <HiOutlineTrash />
                    </div>
                </IconContext.Provider>
            </button>
        </Grid>  
    );
}