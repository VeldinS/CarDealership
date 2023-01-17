import React, {useLayoutEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Ad, Image, Manufacturer, ManufacturerExpanded, Model, SimpleType} from "../../interfaces/Interfaces";
import {fetchAdById, getDummyAd, updateAd} from "../../networking/AdServices";
import {
    fetchAllCarTypes,
    fetchAllDriveTypes,
    fetchAllFuelTypes,
    fetchAllManufacturers,
    fetchAllModels
} from "../../networking/DataServices";
import {
    Button,
    Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Styles from "../landing-page/SalesForm.module.css";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import ButtonRegular from "../common/ButtonRegular";
import ImageEditor from "./ImageEditor";
import {uploadImage} from "../../networking/ImageServices";

function EditAd() {
    const { id } = useParams();
    const [ad, setAd] = useState<Ad>(getDummyAd());

    const [existingImages, setExistingImages] = useState<Image[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);
    const [promptOpened, setPromptOpened] = useState(false);

    const [manufacturers, setManufacturers] = useState<ManufacturerExpanded[]>();
    const [models, setModels] = useState<Model[]>();
    const [carTypes, setCarTypes] = useState<SimpleType[]>();
    const [fuelTypes, setFuelTypes] = useState<SimpleType[]>();
    const [driveTypes, setDriveTypes] = useState<SimpleType[]>();

    useLayoutEffect(() => {
        getAd();
    },[]);

    async function getAd(){
        // @ts-ignore
        const res = await fetchAdById(+id);
        setAd(res);
        setExistingImages(res.images);

        let data = await fetchAllManufacturers();
        setManufacturers(data);
        data = await fetchAllModels();
        setModels(data);
        data = await fetchAllCarTypes();
        setCarTypes(data);
        data = await fetchAllFuelTypes();
        setFuelTypes(data);
        data = await fetchAllDriveTypes();
        setDriveTypes(data);
    }

    return (
        <div style={{display: "grid", gap: "3rem", padding: "3rem"}}>
            <h1 onClick={() => console.error(ad, existingImages)}>UREDI OGLAS</h1>

            <div>
                <h3>1. Slike</h3>
                <ImageEditor
                    existingImages={existingImages}
                    newImages={newImages}
                    existingImagesMutator={setExistingImages}
                    newImagesMutator={setNewImages}
                    //@ts-ignore
                    adId={+id}
                />
            </div>

            <Grid container spacing={3}>
                <Grid item xl={12}>
                    <h3>2. Osnovne informacije</h3>
                </Grid>

                <Grid item xl={12}>
                    <TextField
                        value={ad?.title || ''}
                        className={Styles.input}
                        onChange={(e) => {
                            setAd({...ad!!, title: e.target.value});
                        }}
                        label={"Naslov oglasa"}
                        placeholder={""}
                    />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        className={Styles.input}
                        multiline
                        type={"text"}
                        placeholder={"Opis"}
                        label={"Detaljni opis"}
                        value={ad?.description}
                        onChange={(e) => {
                            setAd({...ad, description: e.target.value});
                        }}
                    />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            label={"Cijena"}
                            className={Styles.input}
                            placeholder={""}
                            value={ad?.price || ''}
                            type={"number"}
                            onChange={(e) => {
                                setAd({...ad!!, price: +e.target.value});
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
                        <FormHelperText>Za cijenu po dogovoru, unesite 0</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        label={"Najniža cijena"}
                        className={Styles.input}
                        placeholder={"Najniža cijena"}
                        value={ad.lowestPrice || ''}
                        type={"number"}
                        onChange={(e) => {
                            setAd({...ad!!, lowestPrice: +e.target.value});
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
                            value={ad!!.manufacturerId}
                            label="Proizvođač"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, manufacturerId: +e.target.value});
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
                        <InputLabel id="demo-simple-select-label">Model</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad.modelId}
                            label="Model"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, modelId: +e.target.value});
                            }}
                        >
                            {
                                models?.filter((model) => {return model.manufacturerId === ad.manufacturerId})?.map((model) => {
                                    return (
                                        <MenuItem value={model.id}>{model.name}</MenuItem>
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
                            label="Godište"
                            maxDate={new Date("2030")}
                            value={new Date(`${ad.year}`)}
                            onChange={(e) => {
                                setAd({...ad, year: e!!.getFullYear()});
                            }}
                            renderInput={(params: any) => <TextField {...params} className={Styles.input} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        id="kilometraza"
                        className={Styles.input}
                        placeholder={"Kilometraža"}
                        label={"Kilometraža"}
                        value={ad.mileage}
                        type={"number"}
                        onChange={(e) => {
                            setAd({...ad, mileage: +e.target.value});
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kilometraža',
                            'step': '1000',
                            'min':'0'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>
                        }}
                    />
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="gorivo-label">Gorivo</InputLabel>
                        <Select
                            labelId="gorivo-label"
                            id="gorivo-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad.fuel_typeId}
                            label="Gorivo"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, fuel_typeId: +e.target.value});
                            }}
                        >
                            {
                                fuelTypes?.map((fuel) => {
                                    return (
                                        <MenuItem value={fuel.id}>{fuel.type}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="transmission-label">Transmisija</InputLabel>
                        <Select
                            labelId="transmission-label"
                            id="transmission-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad.transmission}
                            label="Transmisija"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, transmission: e.target.value});
                            }}
                        >
                            <MenuItem value={"Manuelni"}>Manuelni</MenuItem>
                            <MenuItem value={"Automatik"}>Automatik</MenuItem>
                            <MenuItem value={"Poluautomatik"}>Poluatomatik</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        id="snaga"
                        className={Styles.input}
                        placeholder={"Snaga motora"}
                        label={"Snaga motora"}
                        value={ad.horsepower}
                        type={"number"}
                        onChange={(e) => {
                            setAd({...ad, horsepower: +e.target.value});
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kilometraža',
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
                    <h3>3. Detaljne informacije</h3>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="type-label">Vrsta automobila</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad.car_typeId}
                            label="Vrsta automobila"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, car_typeId: +e.target.value});
                            }}
                        >
                            {
                                carTypes?.map((carType) => {
                                    return (
                                        <MenuItem value={carType.id}>{carType.type}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="drive-label">Pogon</InputLabel>
                        <Select
                            labelId="drive-label"
                            id="drive-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad.drive_typeId}
                            label="Pogon"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, drive_typeId: +e.target.value});
                            }}
                        >
                            {
                                driveTypes?.map((drive) => {
                                    return (
                                        <MenuItem value={drive.id}>{drive.type}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="emission-label">Emisioni standard</InputLabel>
                        <Select
                            labelId="emission-label"
                            id="emission-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.emissionStandard}
                            label="Emisioni standard"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, emissionStandard: e.target.value});
                            }}
                        >
                            <MenuItem value={"Euro 6"}>Euro 6</MenuItem>
                            <MenuItem value={"Euro 5"}>Euro 5</MenuItem>
                            <MenuItem value={"Euro 4"}>Euro 4</MenuItem>
                            <MenuItem value={"Euro 3"}>Euro 3</MenuItem>
                            <MenuItem value={"Euro 2"}>Euro 2</MenuItem>
                            <MenuItem value={"Euro 1"}>Euro 1</MenuItem>
                            <MenuItem value={"Euro 0"}>Euro 0</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="color-label">Boja</InputLabel>
                        <Select
                            labelId="color-label"
                            id="color-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.color}
                            label="Boja"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, color: e.target.value});
                            }}
                        >
                            <MenuItem value={"Bež"}>Bež</MenuItem>
                            <MenuItem value={"Bijela"}>Bijela</MenuItem>
                            <MenuItem value={"Bordo"}>Bordo</MenuItem>
                            <MenuItem value={"Crna"}>Crna</MenuItem>
                            <MenuItem value={"Crvena"}>Crvena</MenuItem>
                            <MenuItem value={"Ljubičasta"}>Ljubičasta</MenuItem>
                            <MenuItem value={"Narandžasta"}>Narandžasta</MenuItem>
                            <MenuItem value={"Plava"}>Plava</MenuItem>
                            <MenuItem value={"Siva"}>Siva</MenuItem>
                            <MenuItem value={"Smeđa"}>Smeđa</MenuItem>
                            <MenuItem value={"Srebrena"}>Srebrena</MenuItem>
                            <MenuItem value={"Zelena"}>Zelena</MenuItem>
                            <MenuItem value={"Zlatna"}>Zlatna</MenuItem>
                            <MenuItem value={"Žuta"}>Žuta</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="parking-camera-label">Parking kamera</InputLabel>
                        <Select
                            labelId="parking-camera-label"
                            id="parking-camera-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.parkingCamera}
                            label="Parking kamera"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, parkingCamera: e.target.value});
                            }}
                        >
                            <MenuItem value={"Nema"}>Nema</MenuItem>
                            <MenuItem value={"Prednja"}>Prednja</MenuItem>
                            <MenuItem value={"Zadnja"}>Zadnja</MenuItem>
                            <MenuItem value={"Prednja i zadnja"}>Prednja i zadnja</MenuItem>
                            <MenuItem value={"Kamera 360"}>Kamera 360</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <TextField
                        id="kubikaza"
                        className={Styles.input}
                        placeholder={"Kubikaža"}
                        label={"Kubikaža"}
                        value={ad.volume}
                        type={"number"}
                        onChange={(e) => {
                            setAd({...ad, volume: +e.target.value});
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
                        id="rim-size"
                        className={Styles.input}
                        placeholder={"Veličina felgi"}
                        label={"Veličina felgi"}
                        value={ad?.rimSize}
                        type={"number"}
                        onChange={(e) => {
                            setAd({...ad, rimSize: +e.target.value});
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
                    <FormControl fullWidth>
                        <InputLabel id="gears-label">Broj stepeni prijenosa</InputLabel>
                        <Select
                            labelId="gears-label"
                            id="gears-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.gears}
                            label="Broj stepeni prijenosa"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, gears: e.target.value});
                            }}
                        >
                            <MenuItem value={"9+R"}>9+R</MenuItem>
                            <MenuItem value={"8+R"}>8+R</MenuItem>
                            <MenuItem value={"7+R"}>7+R</MenuItem>
                            <MenuItem value={"6+R"}>6+R</MenuItem>
                            <MenuItem value={"5+R"}>5+R</MenuItem>
                            <MenuItem value={"4+R"}>4+R</MenuItem>
                            <MenuItem value={"3+R"}>3+R</MenuItem>
                            <MenuItem value={"CVT"}>CVT</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="lights-label">Svjetla</InputLabel>
                        <Select
                            labelId="lights-label"
                            id="lights-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.lights}
                            label="Svjetla"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, lights: e.target.value});
                            }}
                        >
                            <MenuItem value={"Halogena"}>Halogena</MenuItem>
                            <MenuItem value={"Xenon"}>Xenon</MenuItem>
                            <MenuItem value={"LED"}>LED</MenuItem>
                            <MenuItem value={"Laser"}>Laser</MenuItem>
                            <MenuItem value={"Ostalo"}>Ostalo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="tyres-label">Posjeduje gume</InputLabel>
                        <Select
                            labelId="tyres-label"
                            id="tyres-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.tyres}
                            label="Posjeduje gume"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, tyres: e.target.value});
                            }}
                        >
                            <MenuItem value={"Ljetne"}>Ljetne</MenuItem>
                            <MenuItem value={"Zimske"}>Zimske</MenuItem>
                            <MenuItem value={"Ljetne i zimske"}>Ljetne i zimske</MenuItem>
                            <MenuItem value={"Ostalo"}>Ostalo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="doors-label">Broj vrata</InputLabel>
                        <Select
                            labelId="doors-label"
                            id="doors-select"
                            className={Styles.input}
                            //@ts-ignore
                            value={ad?.doors}
                            label="Broj vrata"
                            onChange={(e: SelectChangeEvent)=>{
                                setAd({...ad, doors: e.target.value});
                            }}
                        >
                            <MenuItem value={"2/3"}>2/3</MenuItem>
                            <MenuItem value={"4/5"}>4/5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xl={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Registrovan do"
                            value={new Date(`${ad?.registrationUntil}`)}
                            onChange={(e) => {
                                setAd({...ad, registrationUntil: `${e!!.getFullYear()}-${e!!.getMonth()}`});
                            }}
                            renderInput={(params: any) => <TextField {...params} className={Styles.input} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <div>
                <ButtonRegular
                    text={"OBJAVI"}
                    variant={"filled"}
                    color={"red"}
                    onClick={async () => {
                        // @ts-ignore
                        const res = await updateAd(ad, +id);
                        for(const img of newImages){
                            await uploadImage({
                                src64: img,
                                // @ts-ignore
                                adId: +id
                            });
                        }
                        setPromptOpened(true);
                    }}
                />
            </div>

            <Dialog
                open={promptOpened}
                onClose={() => {setPromptOpened(false);}}
            >
                <DialogTitle>Oglas uspješno kreiran</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Uspješno ste kreirali novi oglas!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link style={{textDecoration: "none", display: "block"}} to={"/admin/oglasi"}>NAZAD NA OGLASE</Link>
                    <Button onClick={() => {setPromptOpened(false)}}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditAd;