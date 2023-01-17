import React, {useLayoutEffect, useState} from 'react';
import {Country, ManufacturerExpanded} from "../../../interfaces/Interfaces";
import {fetchAllCountries, fetchAllManufacturers} from "../../../networking/DataServices";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    Snackbar,
    TextField
} from "@mui/material";
import ButtonRegular from "../../common/ButtonRegular";
import {Add} from "@mui/icons-material";
import ManufacturerCard from "./ManufacturerCard";
import Styles from "../../landing-page/SalesForm.module.css";

function EditManufacturers() {
    const [manufacturers, setManufacturers] = useState<ManufacturerExpanded[]>();
    const [countries, setCountries] = useState<Country[]>([]);
    const [dialogOpened, setDialogOpened] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [newManufacturer, setNewManufacturer] = useState({name: "", countryId: 1});

    useLayoutEffect(() => {
        getManufacturers();
        getCountries();
    });

    async function getManufacturers(){
        const res = await fetchAllManufacturers();
        setManufacturers(res);
    }

    async function getCountries(){
        const res = await fetchAllCountries();
        setCountries(res);
    }

    return (
        <div style={{padding: "3rem", display: "grid", gap: "3rem"}}>
            <Grid container spacing={2}>
                <Grid item xl={2} lg={2} md={3} sm={4} xs={5.5}>
                    <h2 style={{fontSize:"2rem"}}>PROIZVOĐAČI</h2>
                </Grid>
                <Grid item xl={8} lg={8} md={6} sm={4} xs={0}/>
                <Grid item xl={2} lg={2} md={3} sm={4} xs={6}>
                    <ButtonRegular text={"NOVI PROIZVOĐAČ"} variant={"filled"} color={"red"} icon={<Add/>} onClick={() => {setDialogOpened(true)}}/>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {
                    manufacturers && manufacturers.map((manufacturer) => {
                        return (
                            <Grid item xl={12} lg={12} md={12} sm={6} xs={12}>
                                <ManufacturerCard manufacturer={manufacturer}/>
                            </Grid>
                        );
                    })
                }
            </Grid>

            <Dialog open={dialogOpened} onClose={() => {setDialogOpened(false)}}>
                <DialogTitle>NOVI PROIZVOĐAČ</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Ime proizvođača"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setNewManufacturer({...newManufacturer, name: e.target.value});
                        }}
                        style={{marginBottom: "2rem"}}
                    />

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Država</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            className={Styles.input}
                            value={`${newManufacturer!!.countryId}`}
                            label="Država"
                            onChange={(e: SelectChangeEvent)=>{
                                setNewManufacturer({...newManufacturer, countryId: +e.target.value});
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setDialogOpened(false)}}>Otkaži</Button>
                    <Button
                        onClick={async () => {

                        }}
                    >KREIRAJ!
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => {setSnackbarOpen(false)}}
                message="Novi proizvođač kreiran"
                action={undefined}
            />
        </div>
    );
}

export default EditManufacturers;