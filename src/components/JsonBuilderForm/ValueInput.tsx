import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";


export const ValueInput = ({className, objKey, value, type, updateValue}:any) => {

    const renderSwitch = () => {
        switch(type) {
            case 'string':
                return <TextField className={`col-span-3 ${className}`} defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />
            case 'boolean':
                return (
                    <FormControl className={`col-span-3 ${className}`} variant="outlined">
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
                return <TextField type='number' className={`col-span-3 ${className}`} defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />

            default:
                <TextField className={`${className}`} defaultValue={value} onChange={updateValue(objKey, type)} label="Value" variant="outlined" />
        }
    }

    return (
        <div>{renderSwitch()}</div>
    );
}