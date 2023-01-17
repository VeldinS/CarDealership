import React from 'react';
import {AdBriefProps} from "./AdBrief";
import {Card, Grid} from "@mui/material";
import Styles from "./AdBrief.module.css";
import LinkButton from "../common/LinkButton";
import {AccountCircle, DeleteForever, DoneAll, Edit} from "@mui/icons-material";
import ButtonRegular from "../common/ButtonRegular";
import {Offer, OfferExpanded, updateOffer} from "../../networking/OfferServices";
import {updateAd} from "../../networking/AdServices";

interface OfferBriefProps {
    thumbnail: string;
    adTitle: string;
    adPrice: number;
    offer: OfferExpanded;
    setter: Function;
    offersList: OfferExpanded[];
}

function OfferBrief(props: OfferBriefProps) {
    return (
        <Card className={Styles.adBrief}>
            <Grid container spacing={2}>
                <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                    <img style={{height: "100%", width: "100%"}} src={props.thumbnail}/>
                </Grid>

                <Grid item xl={4.5} lg={4.5} md={5} sm={6} xs={12}>
                    <div style={{display: "flex", height:"100%", flexDirection:"column", justifyContent: "space-between"}}>
                        <div>
                            <h3>{props.adTitle}</h3>
                        </div>
                        <div>
                            <h3>{props.adPrice} KM</h3>
                        </div>
                    </div>
                </Grid>

                <Grid item xl={4.5} lg={4.5} md={3} sm={6} xs={12}>
                    <div style={{display: "flex", height:"100%", flexDirection:"column", justifyContent: "space-between", gap:"1rem"}}>
                        <div>
                            <div style={{display:"flex", alignItems: "center"}}>
                                <AccountCircle fontSize={"large"}/>
                                <h3>{props.offer.username}</h3>
                            </div>
                            <h3>Ponuda: <span style={{color: "var(--light-red)"}}>{props.offer.offer}</span> KM</h3>
                            <p>Poruka: {props.offer.message}</p>
                        </div>
                        <div style={{display:"flex", gap: "1rem"}}>
                            <ButtonRegular
                                text={"PRIHVATI"}
                                variant={"filled"}
                                color={"green"}
                                icon={<DoneAll/>}
                                onClick={async () => {
                                    await updateOffer({...props.offer, response: "accepted"}, props.offer.id);
                                    alert("Ponuda prihvaćena");
                                    props.setter(props.offersList.filter((item) => {return item.id !== props.offer.id}));
                                }}
                            />
                            <ButtonRegular
                                text={"ODBIJ"}
                                variant={"filled"}
                                color={"red"}
                                icon={<DeleteForever/>}
                                onClick={async () => {
                                    await updateOffer({...props.offer, response: "rejected"}, props.offer.id);
                                    alert("Ponuda odbijena");
                                    props.setter(props.offersList.filter((item) => {return item.id !== props.offer.id}));
                                }}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}

export default OfferBrief;