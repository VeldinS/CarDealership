import React from 'react';
import {Card} from "@mui/material";

import bg from "../../img/a5.jpg"

function NotFound() {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", position: "relative"}}>
            <img src={bg} style={{height: "100%", width: "100%", objectFit: "cover"}}/>
            <Card style={{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem 4rem", zIndex: 999}}>
                <div style={{textAlign: "center"}}>
                    <h1>NA OVOJ ADRESI SE NIŠTA NE NALAZI</h1>
                    <h3>Provjerite adresu još jednom</h3>
                </div>
            </Card>
        </div>
    );
}

export default NotFound;