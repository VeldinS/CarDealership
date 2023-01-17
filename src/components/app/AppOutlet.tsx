import React from 'react';
import {AppBar, Toolbar} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import {AccountCircle} from "@mui/icons-material";

function AppOutlet() {
    return (
        <div>
            <AppBar position="sticky" style={{backgroundColor: "#FA0000"}}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to={"/"} style={{textDecoration: "none", color: "white"}}><h3>AUTO HASANOVIĆ</h3></Link>
                    <Link to={"/app/mojprofil"} style={{textDecoration: "none", color: "white"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "1ch"}}>
                            <h4>armin_r</h4>
                            <AccountCircle fontSize={"large"}/>
                        </div>
                    </Link>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    );
}

export default AppOutlet;