import React from 'react';
import {Grid} from "@mui/material";
import AdminPanelCard from "./AdminPanelCard";

function AdminPanelLobby() {
    return (
        <Grid container spacing={4} style={{padding: "2rem 4rem"}}>
            <Grid item xl={4}>
                <AdminPanelCard title={"OGLASI"} linkTo={"/admin/oglasi"} iconSrc={"https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-listing-traditional-marketing-flaticons-flat-flat-icons.png"}/>
            </Grid>
            <Grid item xl={4}>
                <AdminPanelCard title={"PONUDE"} linkTo={"/admin/ponude"} iconSrc={"https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-offers-recruitment-agency-flaticons-flat-flat-icons-2.png"}/>
            </Grid>
            <Grid item xl={4}>
                <AdminPanelCard title={"SAOPŠTENJA"} linkTo={"/admin/saopstenja"} iconSrc={"https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-campaign-public-relations-agency-flaticons-flat-flat-icons-2.png"}/>
            </Grid>
            <Grid item xl={4}>
                <AdminPanelCard title={"UREDI PODATKE"} linkTo={"/admin/uredipodatke"} iconSrc={"https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-edit-web-flaticons-flat-flat-icons-2.png"}/>
            </Grid>
            <Grid item xl={4}>
                <AdminPanelCard title={"ODJAVI SE"} linkTo={"/login"} iconSrc={"https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-sign-out-web-flaticons-flat-flat-icons-4.png"}/>
            </Grid>
        </Grid>
    );
}

export default AdminPanelLobby;