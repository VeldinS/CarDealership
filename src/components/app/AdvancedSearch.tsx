import React, {useEffect, useState} from 'react';
import {Filters, getDefaultFilters, ManufacturerExpanded, Model, SimpleType} from "../../interfaces/Interfaces";
import {
    fetchAllCarTypes,
    fetchAllDriveTypes,
    fetchAllFuelTypes,
    fetchAllManufacturers,
    fetchAllModels
} from "../../networking/DataServices";
import {
    Checkbox,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Styles from "../landing-page/SalesForm.module.css";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import ButtonRegular from "../common/ButtonRegular";
import MultiSelectObject from "../common/multiselects/MultiSelectObject";
import MultiSelect from "../common/multiselects/MultiSelect";
import {useNavigate} from "react-router-dom";

function AdvancedSearch() {
    //Main state
    const [title, setTitle] = useState<string>("");
    const [manufacturerId, setManufacturerId] = useState<number>(1);
    const [modelsList, setModelsList] = useState<string[]>([]);
    const [priceFrom, setPriceFrom] = useState<number>(0);
    const [priceTo, setPriceTo] = useState<number>(0);
    const [yearFrom, setYearFrom] = useState<number>(2000);
    const [yearTo, setYearTo] = useState<number>(2022);
    const [mileageFrom, setMileageFrom] = useState<number>(0);
    const [mileageTo, setMileageTo] = useState<number>(0);
    const [volumeFrom, setVolumeFrom] = useState<number>(1.0);
    const [volumeTo, setVolumeTo] = useState<number>(1.0);
    const [horsepowerFrom, setHorsepowerFrom] = useState<number>(50);
    const [horsepowerTo, setHorsepowerTo] = useState<number>(50);
    const [carTypesList, setCarTypesList] = useState<string[]>([]);
    const [fuelTypesList, setFuelTypesList] = useState<string[]>([]);
    const [driveTypesList, setDriveTypesList] = useState<string[]>([]);
    const [transmissions, setTransmissions] = useState<string[]>([]);
    const [emissionStandards, setEmissionStandards] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [parkingCameras, setParkingCameras] = useState<string[]>([]);
    const [rimSizeFrom, setRimSizeFrom] = useState(12);
    const [rimSizeTo, setRimSizeTo] = useState(14);
    const [lights, setLights] = useState<string[]>([]);
    const [tyres, setTyres] = useState<string[]>([]);
    const [doors, setDoors] = useState<string[]>([]);
    

    //Static data
    const [manufacturers, setManufacturers] = useState<ManufacturerExpanded[]>();
    const [models, setModels] = useState<Model[]>();
    const [carTypes, setCarTypes] = useState<SimpleType[]>();
    const [fuelTypes, setFuelTypes] = useState<SimpleType[]>();
    const [driveTypes, setDriveTypes] = useState<SimpleType[]>();

    const navigate = useNavigate();

    useEffect(() => {
        setData();
    },[]);

    async function setData(){
        let res = await fetchAllManufacturers();
        setManufacturers(res);
        res = await fetchAllModels();
        setModels(res);
        res = await fetchAllCarTypes();
        setCarTypes(res);
        res = await fetchAllFuelTypes();
        setFuelTypes(res);
        res = await fetchAllDriveTypes();
        setDriveTypes(res);
    }

    const handleModelChange = (event: SelectChangeEvent<typeof modelsList>) => {
        const {
            target: { value },
        } = event;
        setModelsList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div style={{display: "grid", gap: "3rem", padding: "3rem"}}>
            <h1>DETALJNA PRETRAGA</h1>

            <Grid container spacing={3}>
                <Grid item xl={12}>
                    <h3>1. Osnovne informacije</h3>
                </Grid>

                <Grid item xl={12}>
                    <TextField
                        value={title || ''}
                        className={Styles.input}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        label={"Naslov oglasa"}
                        placeholder={""}
                    />
                </Grid>


                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            label={"Cijena od"}
                            className={Styles.input}
                            placeholder={""}
                            value={priceFrom || 0}
                            type={"number"}
                            onChange={(e) => {
                                setPriceFrom(+e.target.value);
                            }}
                            inputProps={{
                                'aria-label': 'cijena od',
                                'min': '0',
                                step: '100'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">BAM</InputAdornment>
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        label={"Cijena do"}
                        className={Styles.input}
                        placeholder={"Cijena do"}
                        value={priceTo || ''}
                        type={"number"}
                        onChange={(e) => {
                            setPriceTo(+e.target.value);
                        }}
                        inputProps={{
                            'aria-label': 'cijena od',
                            'min': '0',
                            step: '100'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">BAM</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Proizvođač</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={manufacturerId || 1}
                            label="Proizvođač"
                            onChange={(e: SelectChangeEvent)=>{
                                setManufacturerId(+e.target.value);
                            }}
                        >
                            {
                                manufacturers?.map((manufacturer) => {
                                    return (
                                        <MenuItem value={manufacturer.id}>{manufacturer.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Modeli</InputLabel>
                        <Select
                            className={Styles.input}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={modelsList || []}
                            onChange={handleModelChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {
                                models?.filter((model) => {return model.manufacturerId === manufacturerId})?.map((model) => {
                                    return (
                                        <MenuItem value={model.name}>
                                            <Checkbox checked={
                                                modelsList.includes(model.name)
                                            }/>
                                            <ListItemText primary={model.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Godište od"
                            maxDate={new Date("2030")}
                            value={new Date(`${yearFrom}`)}
                            onChange={(e) => {
                                setYearFrom(e!!.getFullYear());
                            }}
                            renderInput={(params: any) => <TextField {...params} className={Styles.input} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Godište do"
                            maxDate={new Date("2030")}
                            value={new Date(`${yearTo}`)}
                            onChange={(e) => {
                                setYearTo(e!!.getFullYear());
                            }}
                            renderInput={(params: any) => <TextField {...params} className={Styles.input} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Kilometraža od"}
                        label={"Kilometraža od"}
                        value={mileageFrom}
                        type={"number"}
                        onChange={(e) => {
                            setMileageFrom(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'step': '1000',
                            'min':'0'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Kilometraža do"}
                        label={"Kilometraža do"}
                        value={mileageTo}
                        type={"number"}
                        onChange={(e) => {
                            setMileageTo(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'step': '1000',
                            'min':'0'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Transmisija"}
                        initialData={["Manuelni", "Automatik", "Poluautomatik"]}
                        setter={setTransmissions}
                        data={transmissions}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Snaga motora od"}
                        label={"Snaga motora od"}
                        value={horsepowerFrom}
                        type={"number"}
                        onChange={(e) => {
                            setHorsepowerFrom(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'step': '1',
                            'min':'0',
                            'max': '500'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">KS</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Snaga motora do"}
                        label={"Snaga motora do"}
                        value={horsepowerTo}
                        type={"number"}
                        onChange={(e) => {
                            setHorsepowerTo(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'step': '1',
                            'min':'0',
                            'max': '500'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">KS</InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>

                <Grid item xl={12}>
                    <h3>2. Detaljne informacije</h3>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelectObject
                        title={"Tip Automobila"}
                        initialData={carTypes || []}
                        setter={setCarTypesList}
                        data={carTypesList}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelectObject
                        title={"Gorivo"}
                        initialData={fuelTypes || []}
                        setter={setFuelTypesList}
                        data={fuelTypesList}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelectObject
                        title={"Pogon"}
                        initialData={driveTypes || []}
                        setter={setDriveTypesList}
                        data={driveTypesList}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Emisioni Standardi"}
                        initialData={["Euro 6", "Euro 5", "Euro 4", "Euro 3", "Euro 2", "Euro 1", "Euro 0"]}
                        setter={setEmissionStandards}
                        data={emissionStandards}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Boja"}
                        initialData={[
                            "Bež", "Bijela", "Bordo", "Crna", "Crvena", "Ljubičasta", "Narandžasta", "Plava", "Siva",
                            "Smeđa", "Srebrena", "Zelena", "Zlatna", "Žuta"
                        ]}
                        setter={setColors}
                        data={colors}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Parking kamera"}
                        initialData={[
                            "Nema", "Prednja", "Zadnja", "Prednja i zadnja", "Kamera 360"
                        ]}
                        setter={setParkingCameras}
                        data={parkingCameras}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Kubikaža od"}
                        label={"Kubikaža od"}
                        value={volumeFrom || 1}
                        type={"number"}
                        onChange={(e) => {
                            setVolumeFrom(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kubikaza-od',
                            'step': '0.1',
                            'min':'0',
                            'max': '8.0'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">L</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Kubikaža do"}
                        label={"Kubikaža do"}
                        value={volumeTo || 1}
                        type={"number"}
                        onChange={(e) => {
                            setVolumeTo(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kubikaza',
                            'step': '0.1',
                            'min':'0',
                            'max': '8.0'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">L</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Veličina felgi od"}
                        label={"Veličina felgi od"}
                        value={rimSizeFrom}
                        type={"number"}
                        onChange={(e) => {
                            setRimSizeFrom(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'velicina-felgi',
                            'step': '1',
                            'min':'1',
                            'max': '28'
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        className={Styles.input}
                        placeholder={"Veličina felgi do"}
                        label={"Veličina felgi do"}
                        value={rimSizeTo}
                        type={"number"}
                        onChange={(e) => {
                            setRimSizeTo(+e.target.value);
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'velicina-felgi',
                            'step': '1',
                            'min':'1',
                            'max': '28'
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Svjetla"}
                        initialData={["Halogena", "Xenon", "LED", "Laser", "Ostalo"]}
                        setter={setLights}
                        data={lights}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Posjeduje gume"}
                        initialData={["Ljetne", "Zimske", "Ljetne i zimske", "Ostalo"]}
                        setter={setTyres}
                        data={tyres}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <MultiSelect
                        title={"Broj vrata"}
                        initialData={["2/3", "4/5"]}
                        setter={setDoors}
                        data={doors}
                    />
                </Grid>

                
            </Grid>

            <div>
                <ButtonRegular
                    text={"PRETRAŽI"}
                    variant={"filled"}
                    color={"red"}
                    onClick={() => {
                        const filters: Filters = {
                            title,
                            manufacturerId,
                            models: modelsList,
                            priceFrom,
                            priceTo,
                            yearFrom,
                            yearTo,
                            mileageFrom,
                            mileageTo,
                            volumeFrom,
                            volumeTo,
                            horsepowerFrom,
                            horsepowerTo,
                            carTypes: carTypesList,
                            fuelTypes: fuelTypesList,
                            driveTypes: driveTypesList,
                            transmissions,
                            emissionStandards,
                            colors,
                            parkingCameras,
                            rimSizeFrom,
                            rimSizeTo,
                            lights,
                            tyres,
                            doors
                        }
                        navigate("/app/prodaja", {state: {initialFilters: filters}});
                    }}
                />
            </div>
        </div>
    );
}

export default AdvancedSearch;