import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "@mui/material";
import Styles from "./AdminPanelCard.module.css"

interface APCProps{
    title: string;
    linkTo: string;
    iconSrc: string;
}
function AdminPanelCard(props: APCProps) {
    return (
        <Link to={props.linkTo} style={{textDecoration: "none"}}>
            <Card className={Styles.card}>
                <img src={props.iconSrc} alt={props.title}/>
                <h3>{props.title}</h3>
            </Card>
        </Link>
    );
}

export default AdminPanelCard;