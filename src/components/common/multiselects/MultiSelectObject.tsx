import React from 'react';
import {SimpleType} from "../../../interfaces/Interfaces";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Styles from "../../landing-page/SalesForm.module.css";

interface MSOProps{
    title: string;
    initialData: SimpleType[];
    setter: Function;
    data: string[];
}

function MultiSelectObject(props: MSOProps) {
    const handleChange = (event: SelectChangeEvent<typeof props.initialData>) => {
        const {
            target: { value },
        } = event;
        props.setter(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id={`${props.title}-label`}>{props.title}</InputLabel>
                <Select
                    className={Styles.input}
                    labelId={`${props.title}-label`}
                    id="demo-multiple-checkbox"
                    multiple
                    //@ts-ignore
                    value={props.data}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {props.initialData.map((item) => (
                        <MenuItem key={item.id} value={item.type}>
                            <Checkbox checked={props.data.indexOf(item.type) > -1} />
                            <ListItemText primary={item.type} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultiSelectObject;