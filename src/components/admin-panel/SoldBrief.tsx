import React, {useState} from 'react';
import {AdBriefProps} from "./AdBrief";
import {deleteAdById} from "../../networking/AdServices";
import {deleteImageById} from "../../networking/ImageServices";
import {Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import Styles from "./AdBrief.module.css";
import LinkButton from "../common/LinkButton";
import {DeleteForever, DoneAll, Edit} from "@mui/icons-material";
import ButtonRegular from "../common/ButtonRegular";

function SoldBrief(props: AdBriefProps) {
    const [promptOpened, setPromptOpened] = useState(false);

    async function deleteForever(){
        await deleteAdById(props.carID);
        for(const img of props.images){
            await deleteImageById(img.id);
        }
        const newAdList = props.adListRef.filter(ad => {
            return ad.id !== props.carID;
        });
        props.adMutator(newAdList);
        setPromptOpened(false);
    }

    return (
        <Card className={Styles.adBrief}>
            <Grid container spacing={2}>
                <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                    <img className={Styles.soldBriefThumbnail} style={{height: "100%", width: "100%"}} src={props.images[0].src64}/>
                </Grid>

                <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
                    <div style={{display: "flex", height:"100%", flexDirection:"column", justifyContent: "space-between"}}>
                        <div>
                            <h3>{props.adTitle}</h3>
                            <h4 style={{color: "var(--light-text)", fontWeight: "normal"}}>{props.dateCreated}</h4>
                        </div>
                        <div>
                            <h3>{props.price} KM</h3>
                        </div>
                    </div>
                </Grid>

                <Grid item xl={2} lg={2} md={3} sm={12} xs={12}>
                    <div style={{height:"100%", display: "grid", gap: "1rem"}}>
                        <LinkButton linkTo={`/admin/${props.carID}`} text={"MODIFIKUJ"} variant={"filled"} color={"blue"} icon={<Edit/>}/>
                        <ButtonRegular
                            text={"PONIŠTI"}
                            variant={"filled"}
                            color={"red"}
                            icon={<DeleteForever/>}
                            onClick={() => {
                                setPromptOpened(true);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={promptOpened}
                onClose={() => {setPromptOpened(false);}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Poništi oglas ${props.adTitle}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Jeste li sigurni da želite trajno obrisati navedeni oglas? Nakon poništavanja, oglas je nemoguće vratiti!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setPromptOpened(false)}}>OTKAŽI</Button>
                    <Button onClick={() => {deleteForever()}}>PONIŠTI OGLAS</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default SoldBrief;