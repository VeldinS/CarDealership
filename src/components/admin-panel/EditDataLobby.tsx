import React from 'react';
import {Grid} from "@mui/material";
import AdminPanelCard from "./AdminPanelCard";

import manufacturers from "../../img/icons/manufacturer.png"
import models from "../../img/icons/model.png"
import fuels from "../../img/icons/fuel.png"
import types from "../../img/icons/type.png"
import colors from "../../img/icons/colors.png"

function EditDataLobby() {
    return (
        <Grid container spacing={4} style={{padding: "2rem 4rem"}}>
            <Grid item xl={2.4}>
                <AdminPanelCard title={"PROIZVOĐAČI"} linkTo={"/admin/uredipodatke/proizvodjaci"} iconSrc={manufacturers}/>
            </Grid>
            <Grid item xl={2.4}>
                <AdminPanelCard title={"MODELI"} linkTo={"/admin/uredipodatke/modeli"} iconSrc={models}/>
            </Grid>
            <Grid item xl={2.4}>
                <AdminPanelCard title={"GORIVA"} linkTo={"/admin/uredipodatke/goriva"} iconSrc={fuels}/>
            </Grid>
            <Grid item xl={2.4}>
                <AdminPanelCard title={"TIPOVI"} linkTo={"/admin/uredipodatke/tipovi"} iconSrc={types}/>
            </Grid>
            <Grid item xl={2.4}>
                <AdminPanelCard title={"BOJE"} linkTo={"/admin/uredipodatke/boje"} iconSrc={colors}/>
            </Grid>
        </Grid>
    );
}

export default EditDataLobby;