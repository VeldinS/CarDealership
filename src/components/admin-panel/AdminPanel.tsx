import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

function AdminPanel() {
    return (
        <div>
            <AppBar position="sticky" style={{backgroundColor: "#FA0000"}}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to={"/admin"} style={{textDecoration: "none", color: "white"}}><h3>AUTO HASANOVIĆ - ADMIN PANEL</h3></Link>
                    <div style={{display: "flex", alignItems: "center", gap: "1ch"}}>
                        <h4>admir_h</h4>
                        <AccountCircle fontSize={"large"}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    );
}

export default AdminPanel;