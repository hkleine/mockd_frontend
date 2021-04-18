import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";


export const ValueInput = ({className, objKey, value, type, updateValue}:any) => {

    const renderSwitch = () => {
        switch(type) {
            case 'string':
                return <TextField className="w-full" defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />
            case 'boolean':
                return (
                    <FormControl className="w-full" variant="outlined">
                        <InputLabel shrink >Value</InputLabel>
                        <Select
                            defaultValue={value}
                            onChange={updateValue(objKey, type)}
                            labelWidth={40}
                        >
                        <MenuItem value={"true"}>true</MenuItem>
                        <MenuItem value={"false"}>false</MenuItem>
                        </Select>
                    </FormControl> 
                )
            case 'number':
                return <TextField className="w-full" type='number' defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />
            
            case 'object': 
                return (
                    <TextField
                        className="w-full"
                        label="Object"
                        multiline
                        defaultValue="{}"
                        variant="outlined"
                        />
                )

            default:
                return <TextField className="w-full" defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />
        }
    }

    return (
        <div className={`${className}`}>{renderSwitch()}</div>
    );
}