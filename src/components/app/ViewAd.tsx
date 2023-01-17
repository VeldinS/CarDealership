import React, {useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AdExpanded} from "../../interfaces/Interfaces";
import {fetchAdById, getDummyAd} from "../../networking/AdServices";
import {
    Button,
    Card, Dialog, DialogActions, DialogContent, FormControl,
    Grid,
    IconButton, InputAdornment,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow, TextField,
    Tooltip
} from "@mui/material";
import Gallery from "../common/Gallery";
import {ShoppingCart} from "@mui/icons-material";
import Styles from "../landing-page/SalesForm.module.css";
import {createNewOffer} from "../../networking/OfferServices";

function ViewAd() {
    const { id } = useParams();
    const [ad, setAd] = useState<AdExpanded>();
    const [buyDialogOpened, setBuyDialogOpened] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [userOffer, setUserOffer] = useState(0);
    const [offerMessage, setOfferMessage] = useState("");

    useLayoutEffect(() => {
        getAd();
    }, []);

    async function getAd(){
        if(id){
            const res = await fetchAdById(parseInt(id));
            setAd(res);
        }
    }

    if (ad) return (
        <div style={{padding: "3rem", display: "grid", gap: "3rem"}}>
            <Grid container spacing={4}>
                <Grid item xl={6}>
                    <Gallery images={ad.images}/>
                </Grid>
                <Grid item xl={6}>
                    <div style={{display: "grid", height: "100%", justifyContent:"space-evenly"}}>
                        <h1>{ad.title}</h1>
                        <p>{ad.description}</p>
                        <div style={{display: "flex", gap:"1rem"}}>
                            <h2><b>{ad.price} KM</b></h2>
                            <Tooltip title={"Pošalji ponudu"}>
                                <ShoppingCart style={{color: "#FA0000"}} onClick={() => setBuyDialogOpened(true)}/>
                            </Tooltip>
                        </div>
                    <Grid container spacing={4}>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Proizvođač</h4>
                                <h2>{ad.manufacturer.name}</h2>
                            </Card>
                        </Grid>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Model</h4>
                                <h2>{ad.model.name}</h2>
                            </Card>
                        </Grid>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Godište</h4>
                                <h2>{ad.year}</h2>
                            </Card>
                        </Grid>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Kilometraža</h4>
                                <h2>{ad.mileage}</h2>
                            </Card>
                        </Grid>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Gorivo</h4>
                                <h2>{ad.fuel_type.type}</h2>
                            </Card>
                        </Grid>
                        <Grid item xl={4}>
                            <Card style={{textAlign: "center", padding: "1.5rem"}}>
                                <h4>Transmisija</h4>
                                <h2>{ad.transmission}</h2>
                            </Card>
                        </Grid>
                    </Grid>
                    </div>
                </Grid>
            </Grid>

            <h1>OSNOVNE INFORMACIJE</h1>

            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Proizvođač</TableCell>
                                <TableCell align="right">{ad.manufacturer.name}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Model</TableCell>
                                <TableCell align="right">{ad.model.name}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Godište</TableCell>
                                <TableCell align="right">{ad.year}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Kilometraža</TableCell>
                                <TableCell align="right">{ad.mileage} km</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Gorivo</TableCell>
                                <TableCell align="right">{ad.fuel_type.type}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Transmisija</TableCell>
                                <TableCell align="right">{ad.transmission}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Snaga motora</TableCell>
                                <TableCell align="right">{ad.horsepower} KS ({ad.horsepower*0.746} KW)</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Godište</TableCell>
                                <TableCell align="right">{ad.year}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <h1>DETALJNE INFORMACIJE</h1>

            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Vrsta automobila</TableCell>
                                <TableCell align="right">{ad.car_type.type}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Pogon</TableCell>
                                <TableCell align="right">{ad.drive_type.type}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Emisioni standard</TableCell>
                                <TableCell align="right">{ad.emissionStandard}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Boja</TableCell>
                                <TableCell align="right">{ad.color}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Parking kamera</TableCell>
                                <TableCell align="right">{ad.parkingCamera}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Kubikaža</TableCell>
                                <TableCell align="right">{ad.volume}l</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Veličina felgi</TableCell>
                                <TableCell align="right">{ad.rimSize}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Broj stepeni prijenosa</TableCell>
                                <TableCell align="right">{ad.gears}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Svjetla</TableCell>
                                <TableCell align="right">{ad.lights}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Posjeduje gume</TableCell>
                                <TableCell align="right">{ad.tyres}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Broj vrata</TableCell>
                                <TableCell align="right">{ad.doors}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog fullWidth maxWidth={"sm"} open={buyDialogOpened} onClose={() => {setBuyDialogOpened(false)}}>
                <DialogContent style={{display: "grid", gap: "1rem"}}>
                    <h1>POŠALJI PONUDU</h1>
                    <FormControl fullWidth>
                        <TextField
                            label={"Vaša ponuda"}
                            className={Styles.input}
                            placeholder={""}
                            value={userOffer || ''}
                            type={"number"}
                            onChange={(e) => {
                                setUserOffer(+e.target.value);
                            }}
                            inputProps={{
                                'aria-label': 'cijena od',
                                'min': ad.lowestPrice,
                                step: '100'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">BAM</InputAdornment>
                            }}
                        />
                    </FormControl>

                    {
                        userOffer <= ad.lowestPrice && <h3 style={{color: "#FA0000"}}>Admin neće razmatrati ponude ispod {ad.lowestPrice}</h3>
                    }

                    <TextField
                        className={Styles.input}
                        multiline
                        type={"text"}
                        placeholder={"Poruka"}
                        label={"Poruka"}
                        value={offerMessage}
                        onChange={(e) => {
                            setOfferMessage(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBuyDialogOpened(false)}>OTKAŽI</Button>
                    <Button onClick={async () => {
                        await createNewOffer({
                            username: "armin_r",
                            offer: userOffer,
                            adId: ad!!.id,
                            message: offerMessage,
                            response: "pending"
                        }).then(() => setSnackbarOpen(true));
                    }}>POŠALJI</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => {setSnackbarOpen(false); setBuyDialogOpened(false)}}
                message="Ponuda poslana"
                action={undefined}
            />
        </div>
    );

    return <h1>Greška u učitavanju oglasa, pokušajte ponovo</h1>
}

export default ViewAd;