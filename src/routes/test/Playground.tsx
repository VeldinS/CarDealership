import React from 'react';
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
import ButtonRegular from "../../components/common/ButtonRegular";

function Playground() {

    const initial = [
        {
            id: 1,
            name: "Audi"
        },
        {
            id: 2,
            name: "BMW"
        },
        {
            id: 3,
            name: "Mercedes"
        },
        {
            id: 4,
            name: "VW"
        },
        {
            id: 5,
            name: "Škoda"
        },
    ];

    const [manufacturers, setManufacturers] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof manufacturers>) => {
        const {
            target: { value },
        } = event;
        setManufacturers(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={manufacturers}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {initial.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.name}>
                            <Checkbox checked={manufacturers.indexOf(manufacturer.name) > -1} />
                            <ListItemText primary={manufacturer.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <ButtonRegular text={"SUBMIT"} variant={"filled"} color={"red"} onClick={() => console.log(manufacturers)}/>
        </div>
    );
}

export default Playground;