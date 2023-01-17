import React from 'react';
import {Link} from "react-router-dom";
import {Card, Grid} from "@mui/material";
import Styles from "./AdCard.module.css";

interface AdCardProps{
    carID: number;
    thumbnailURL: string;
    adTitle: string;
    yearBuilt: number;
    transmission: string;
    mileage: number;
    horsepower: number;
    price: number;
}

function AdCard(props: AdCardProps) {
    return (
        <Link to={`/app/prodaja/${props.carID}`} style={{textDecoration: "none"}}>
            <Card className={Styles.adCard}>
                <img src={props.thumbnailURL} className={Styles.adThumbnail}/>
                <div style={{padding: "1rem"}}>
                    <h3>{props.adTitle}</h3>
                    <Grid className={Styles.attributesGrid} container spacing={1} style={{}}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            <h5 style={{fontSize: "0.9rem"}}>{props.yearBuilt}. godište</h5>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            <h5 style={{fontSize: "0.9rem"}}>{props.transmission}</h5>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            <h5 style={{fontSize: "0.9rem"}}>{props.mileage} km</h5>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            <h5 style={{fontSize: "0.9rem"}}>{props.horsepower} KS</h5>
                        </Grid>
                    </Grid>
                </div>
                <h3 className={Styles.price}>{props.price} KM</h3>
            </Card>
        </Link>
    );
}

export default AdCard;