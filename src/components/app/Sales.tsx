import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {AdExpanded, Filters, ManufacturerExpanded, Model} from "../../interfaces/Interfaces";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {
    Box,
    Card,
    Checkbox,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    SwipeableDrawer,
    TextField,
    Tooltip
} from "@mui/material";
import AdCard from "./AdCard";
import {fetchAllAds} from "../../networking/AdServices";
import {Clear, FilterList, GridView, SavedSearch, Sort} from "@mui/icons-material";
import {fetchAllManufacturers, fetchAllModels} from "../../networking/DataServices";
import Styles from "../landing-page/SalesForm.module.css";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import ButtonRegular from "../common/ButtonRegular";
import {advancedFilter} from "../../filter/Filters";

function Sales() {
    const location = useLocation();
    const navigate = useNavigate();
    const [allAds, setAllAds] = useState<AdExpanded[]>([]);
    const [results, setResults] = useState<AdExpanded[]>([]);

    const [manufacturerId, setManufacturerId] = useState<number>(999);
    const [modelsList, setModelsList] = useState<string[]>([]);
    const [priceFrom, setPriceFrom] = useState<number>(0);
    const [priceTo, setPriceTo] = useState<number>(0);
    const [mileageFrom, setMileageFrom] = useState<number>(0);
    const [mileageTo, setMileageTo] = useState<number>(0);
    const [yearFrom, setYearFrom] = useState<number>(2000);
    const [yearTo, setYearTo] = useState<number>(2022);

    //Static data
    const [manufacturers, setManufacturers] = useState<ManufacturerExpanded[]>();
    const [models, setModels] = useState<Model[]>();

    const [filtersOpened, setFiltersOpened] = useState(false);

    const [filters, setFilters] = useState<Filters>();
    const [query, setQuery] = useState("");
    const [sorted, setSorted] = useState(false);

    useLayoutEffect(() => {
        getAds();
        setData();
        // @ts-ignore
        if(location?.state?.initialFilters){
            // @ts-ignore
            const initialFilters = location.state.initialFilters;
            setFilters({
                mileageFrom: initialFilters.mileageFrom,
                mileageTo: initialFilters.mileageUpto,
                priceFrom: initialFilters.priceFrom,
                priceTo: initialFilters.priceUpto
            });
            setPriceFrom(initialFilters.priceFrom);
            setPriceTo(initialFilters.priceUpto);
            setMileageFrom(initialFilters.mileageFrom);
            setMileageTo(initialFilters.mileageUpto);
        }

    }, []);

    useEffect(() => {
        filters && setResults(advancedFilter(allAds, filters));
        setFiltersOpened(false);
    }, [filters]);


    async function getAds() {
        const res = await fetchAllAds();
        setAllAds(res);
        setResults(res);
    }

    async function setData(){
        let res = await fetchAllManufacturers();
        setManufacturers(res);
        res = await fetchAllModels();
        setModels(res);
    }

    function sortResults(){
        const res = results.sort((a, b) => {
            if(a.price < b.price) return -1;
            if(a.price > b.price) return 1;
            return 0;
        })
        setResults(res);
    }

    const handleModelChange = (event: SelectChangeEvent<typeof modelsList>) => {
        const {
            target: { value },
        } = event;
        setModelsList(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function renderAds(){
        const ads = results.filter((ad) => {return ad.title.toLowerCase().includes(query)});
        if (ads.length < 1){
            return <h1>NEMA REZULTATA</h1>
        }
        if(sorted){
            ads.sort((a, b) => {
                if(a.price < b.price) return -1;
                if(a.price > b.price) return 1;
                return 0;
            });
        }
        return ads.map((item) => {
            return (
                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <AdCard
                        carID={item.id} thumbnailURL={item.images[0].src64}
                        adTitle={item.title}
                        yearBuilt={item.year}
                        transmission={item.transmission}
                        mileage={item.mileage}
                        horsepower={item.horsepower}
                        price={item.price}
                    />
                </Grid>
            );
        })
    }

    return (
        <div style={{padding: "3rem", display: "grid", gap: "2rem"}}>
            <h1>PRODAJA</h1>
            <Grid container spacing={4}>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <ReactSearchAutocomplete
                        items={[]}
                        onSearch={(keyword) => {
                            setQuery(keyword.toLowerCase());
                        }}
                        placeholder={"Pretraži oglase"}
                        styling={{borderRadius: "0", zIndex: 1000}}
                    />
                </Grid>
                <Grid item xl={0.8}>
                    <Card style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title={"Filtriraj listu"}>
                            <IconButton style={{color: "#FA0000"}} onClick={() => {setFiltersOpened(!filtersOpened)}} >
                                <FilterList/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
                <Grid item xl={0.8}>
                    <Card style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title={"Sortiraj listu"}>
                            <IconButton style={sorted ? {color: "#FA0000"} : {color: "var(--light-text)"} } onClick={() => setSorted(!sorted)}>
                                <Sort/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
                <Grid item xl={0.8}>
                    <Card style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title={"Detaljna pretraga"}>
                            <IconButton onClick={() => navigate("/app/pretraga")} style={{color: "#FA0000"}}>
                                <SavedSearch/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
                <Grid item xl={0.8}>
                    <Card style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title={"Obriši sve filtere"}>
                            <IconButton style={{color: "#FA0000"}} onClick={() => setFilters({})}>
                                <Clear/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
                <Grid item xl={0.8}>
                    <Card style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title={"Grid"}>
                            <IconButton style={{color: "#FA0000"}}>
                                <GridView/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {
                    renderAds()
                }
            </Grid>

            <React.Fragment key={'right'}>
                <SwipeableDrawer
                    anchor={'right'}
                    open={filtersOpened}
                    onClose={() => {setFiltersOpened(false)}}
                    onOpen={() => {setFiltersOpened(true)}}
                >
                    <Box style={{width: "28vw", padding: "2rem", display: "grid", gap: "1rem"}}>
                        <h1>FILTERI</h1>
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
                                    setModelsList([]);
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
                        <ButtonRegular
                            text={"PRIMJENI"}
                            variant={"filled"}
                            color={"red"}
                            onClick={() => {
                                setFilters({
                                    manufacturerId,
                                    models: modelsList,
                                    priceFrom,
                                    priceTo,
                                    yearFrom,
                                    yearTo,
                                    mileageFrom,
                                    mileageTo
                                });
                            }}
                        />
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default Sales;