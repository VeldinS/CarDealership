import React from 'react';
import {Card, Grid} from "@mui/material";

function Location() {
    return (
        <Card style={{padding: "2rem"}}>
            <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div style={{marginBottom:"2rem"}}>
                        <h1>Posjetite nas na našoj adresi:</h1>
                        <h1>Magistralni put M18, BR. 1</h1>
                        <h1>75270 Živinice</h1>
                    </div>

                    <h1 style={{marginBottom: "2rem"}}>RADNO VRIJEME</h1>

                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            PONEDJELJAK
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            UTORAK
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            SRIJEDA
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            ČETVRTAK
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            PETAK
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            SUBOTA
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            10:00 - 16:00
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            NEDJELJA
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                            <span>NERADNA</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.965493787496!2d18.647573615394357!3d44.45437877910193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47594d4da7de408b%3A0xa5835a97fdaa3a01!2sAuto%20Hasanovi%C4%87!5e0!3m2!1sen!2sus!4v1650960835046!5m2!1sen!2sus"
                        width="100%" height="100%" style={{border: 0}} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"/>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Location;