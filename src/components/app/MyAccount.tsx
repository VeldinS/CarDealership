import React, {useLayoutEffect, useState} from 'react';
import {fetchAllOffers, OfferExpanded, updateOffer} from "../../networking/OfferServices";
import {Card, Grid} from "@mui/material";
import Styles from "../admin-panel/AdBrief.module.css";
import {AccountCircle, DeleteForever, DoneAll} from "@mui/icons-material";
import ButtonRegular from "../common/ButtonRegular";
import LinkButton from "../common/LinkButton";

function MyAccount() {
    const [myOffers, setMyOffers] = useState<OfferExpanded[]>([]);

    useLayoutEffect(() => {
        getMyOffers()
    });

    async function getMyOffers(){
        const res = await fetchAllOffers();
        setMyOffers(res.filter((item: any) => {
            return item.username === "armin_r";
        }))
    }

    return (
        <div style={{padding: "3rem", display: "grid", gap: "1.5rem"}}>
            <h1>MOJE PONUDE</h1>
            <div>
                {
                    myOffers.length === 0 ? <h2>NEMATE PONUDA</h2> : (
                        myOffers.map((offer) => {
                            return <Card className={Styles.adBrief} style={{marginBottom: "2rem"}}>
                                <Grid container spacing={2}>
                                    <Grid item xl={4} lg={3} md={4} sm={12} xs={12}>
                                        <img style={{height: "100%"}} src={offer.ad.images[0].src64}/>
                                    </Grid>

                                    <Grid item xl={8} lg={4.5} md={5} sm={6} xs={12}>
                                        <div style={{display: "grid", gap: "2rem", height: "100%"}}>
                                            <div>
                                                <h3>{offer.ad.title}</h3>
                                                <h3>{offer.ad.price} KM</h3>
                                            </div>
                                            <div>
                                                <h3>Vaša ponuda: <span style={{color: "var(--light-red)"}}>{offer.offer}</span> KM</h3>
                                                <p>Poruka: {offer.message}</p>
                                            </div>
                                            <h2>
                                                Status:
                                                {
                                                    offer.response === "rejected" && <span style={{color: "red"}}> ODBIJENO</span>
                                                }
                                                {
                                                    offer.response === "accepted" && <span style={{color: "green"}}> PRIHVAĆENO</span>
                                                }
                                                {
                                                    offer.response === "pending" && <span style={{color: "blue"}}> NA ČEKANJU</span>
                                                }
                                            </h2>
                                            <LinkButton
                                                linkTo={`/app/prodaja/${offer.ad.id}`}
                                                text={"POGLEDAJ OGLAS"}
                                                variant={"filled"}
                                                color={"red"}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        })
                    )
                }
            </div>
        </div>
    );
}

export default MyAccount;