import React from 'react';
import {Grid} from "@mui/material";
import {Facebook, Instagram, Mail, Shop, WhatsApp} from "@mui/icons-material";
import Styles from "./Footer.module.css";


function Footer() {
    return (
        <footer style={{backgroundColor: "black", color: "white", padding: "2rem 4rem 4rem 4rem"}}>
            <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <h3>&copy; 2021 Auto Hasanović</h3>
                    <h3>Magistralni put M18</h3>
                    <h3>75270 Živinice</h3>
                    <h3>Bosna i Hercegovina</h3>
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <h3> <Mail fontSize={"large"} style={{color: "#FA0000"}}/> autohasanovic2019@gmail.com</h3>
                    <h3> <Mail fontSize={"large"} style={{color: "#FA0000"}}/> admirhasanovic2017@gmail.com</h3>
                    <div style={{display: "flex", gap: "1ch", marginTop: "1rem"}}>
                        <a href={"https://www.facebook.com"} className={Styles.link}>
                            <Facebook/>
                        </a>

                        <a href={"https://www.instagram.com"} className={Styles.link}>
                            <Instagram/>
                        </a>

                        <a href={"https://wa.me/"} className={Styles.link}>
                            <WhatsApp/>
                        </a>

                        <a href={"https://adem888.olx.ba"} className={Styles.link}>
                            <Shop/>
                        </a>
                    </div>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;
