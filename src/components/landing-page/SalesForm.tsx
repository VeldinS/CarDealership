import React, {useEffect, useState} from 'react';
import {Divider, Grid, InputAdornment, OutlinedInput} from "@mui/material";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {fetchAllModels} from "../../networking/DataServices";
import Styles from "./SalesForm.module.css"
import ButtonRegular from "../common/ButtonRegular";
import LinkButton from "../common/LinkButton";
import {useNavigate} from "react-router-dom";

function SalesForm() {
    const [query, setQuery] = useState("");
    const [mileageFrom, setMileageFrom] = useState("");
    const [mileageUpto, setMileageUpto] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceUpto, setPriceUpto] = useState("");

    const [models, setModels] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getModels();
    },[]);

    async function getModels(){
        const res = await fetchAllModels();
        const models = res.map((model: any) => {
            return {
                id: model.id,
                name: `${model.manufacturer.name} ${model.name}`
            }
        })
        setModels(models);
    }

    function handleOnSearch(){}

    function handleOnHover(){}

    function handleOnFocus(){}

    function handleOnSelect(item: {id:number, name:string;}){
        setQuery(item.name);
    }

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    return (
        <div style={{width: "100%"}}>
            <ReactSearchAutocomplete
                items={models}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                formatResult={formatResult}
                placeholder={"Pretraži oglase"}
                styling={{borderRadius:"0", zIndex:1000}}
            />

            <Divider style={{marginTop: "1rem", marginBottom: "1rem"}}>ili</Divider>

            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h3>Cijena</h3>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <OutlinedInput
                        id="cijena-od"
                        className={Styles.input}
                        placeholder={"Cijena od"}
                        value={priceFrom}
                        type={"number"}
                        onChange={(e) => {
                            setPriceFrom(e.target.value);
                        }}
                        endAdornment={<InputAdornment position="end">BAM</InputAdornment>}
                        inputProps={{
                            'aria-label': 'cijena od',
                            'min': '0',
                            step: '100'
                        }}
                    />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <OutlinedInput
                        id="cijena-do"
                        className={Styles.input}
                        placeholder={"Cijena do"}
                        value={priceUpto}
                        type={"number"}
                        onChange={(e) => {
                            setPriceUpto(e.target.value);
                        }}
                        endAdornment={<InputAdornment position="end">BAM</InputAdornment>}
                        inputProps={{
                            'aria-label': 'cijena do',
                            'min': priceFrom,
                            step: '100'
                        }}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} style={{marginTop: "1rem", marginBottom: "2rem"}}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h3>Kilometraža</h3>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <OutlinedInput
                        id="kilometraza-od"
                        className={Styles.input}
                        placeholder={"Kilometraža od"}
                        value={mileageFrom}
                        type={"number"}
                        onChange={(e) => {
                            if(+e.target.value >= 0){
                                setMileageFrom(e.target.value);
                            }
                        }}
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kilometraža',
                            'step': '1000'
                        }}
                    />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <OutlinedInput
                        id="kilomentraza-do"
                        className={Styles.input}
                        placeholder={"Kilometraža do"}
                        value={mileageUpto}
                        type={"number"}
                        onChange={(e) => {
                            if(+e.target.value >= 0){
                                setMileageUpto(e.target.value)
                            }
                        }}
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'kilometraža',
                            'step': '1000',
                            'min': mileageFrom
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <ButtonRegular
                        text={"PRETRAŽI"}
                        variant={"filled"}
                        color={"red"}
                        onClick={() => {
                            navigate("/app/prodaja", {state: {initialFilters: {priceFrom, priceUpto, mileageFrom, mileageUpto}}})
                        }}
                    />
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <LinkButton linkTo={"/app/pretraga"} text={"DETALJNA PRETRAGA"} variant={"outlined"} color={"red"}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default SalesForm;
