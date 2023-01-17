import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Country, ManufacturerExpanded} from "../../../interfaces/Interfaces";
import {Card, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import ButtonRegular from "../../common/ButtonRegular";
import {DeleteForever, DoneAll, Edit} from "@mui/icons-material";
import Styles from "../../landing-page/SalesForm.module.css";
import {fetchAllCountries, getDummyManufacturer} from "../../../networking/DataServices";

interface ManufacturerCardProps{
    manufacturer: ManufacturerExpanded;
}

function ManufacturerCard(props: ManufacturerCardProps) {
    const [editMode, setEditMode] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [newData, setNewData] = useState<ManufacturerExpanded>(getDummyManufacturer());

    useLayoutEffect(() => {
        setNewData({...props.manufacturer});
        getCountries();
    }, []);

    async function getCountries(){
        const res = await fetchAllCountries();
        setCountries(res);
    }

    return (
        <Card style={{padding: "1.5rem"}}>
            <Grid container spacing={2} justifyContent={"space-between"}>
                <Grid item xl={3}>
                    {
                        !editMode ? <>
                            <h1 style={{height: "50%"}}>{newData?.name.toUpperCase()}</h1>
                            <h3 style={{height: "50%"}}>{newData?.country.name}</h3>
                        </> : (
                            <>
                                <TextField
                                    value={newData?.name || ''}
                                    className={Styles.input}
                                    onChange={(e) => {
                                        setNewData({...newData!!, name: e.target.value});
                                    }}
                                    label={"Ime proizvođača"}
                                    placeholder={""}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Država</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        className={Styles.input}
                                        value={`${newData!!.countryId}`}
                                        label="Država"
                                        onChange={(e: SelectChangeEvent)=>{
                                            setNewData({...newData!!, countryId: +e.target.value});
                                        }}
                                    >
                                        {
                                            countries?.map((country) => {
                                                return (
                                                    <MenuItem value={country.id}>{country.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>

                            </>
                        )
                    }

                </Grid>
                <Grid item xl={3}>
                    <div style={{height:"100%", display: "grid", gap: "1rem"}}>
                        {
                            editMode
                                ? <ButtonRegular
                                    text={"SAČUVAJ"}
                                    variant={"filled"}
                                    color={"green"}
                                    icon={<DoneAll/>}
                                    onClick={async () => {
                                        setEditMode(false);
                                    }}
                                />
                                : <ButtonRegular
                                    text={"MODIFIKUJ"}
                                    variant={"filled"}
                                    color={"blue"}
                                    icon={<Edit/>}
                                    onClick={() => {
                                        setEditMode(true);
                                    }}
                                />
                        }

                        <ButtonRegular
                            text={"PONIŠTI"}
                            variant={"filled"}
                            color={"red"}
                            icon={<DeleteForever/>}
                            onClick={() => {
                                //setPromptOpened(true);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ManufacturerCard;