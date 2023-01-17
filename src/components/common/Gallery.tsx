import React, {useLayoutEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import Styles from "./Gallery.module.css"
import {Image} from "../../interfaces/Interfaces";

interface GalleryProps{
    images: Image[];
}

function Gallery(props: GalleryProps) {
    const [index, setIndex] = useState(0);
    const [activeImage, setActiveImage] = useState("");
    const [imgs, setImgs] = useState<string[]>([]);
    const [largeViewOpened, setLargeViewOpened] = useState(false);

    useLayoutEffect(() => {
        setImgs(props.images.map((img) => {return img.src64}));
        setActiveImage(props.images[0].src64);
    },[]);

    function incrementIndex() {
        setActiveImage(imgs[index+2]);
        if(index !== imgs.length-2){
            setIndex(index+2);
        }
    }

    function decrementIndex(){
        setActiveImage(imgs[index]);
        if(index > 0){
            setIndex(index-2);
        }
    }

    function middle(){
        setActiveImage(imgs[index+1]);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <img src={activeImage} style={{aspectRatio: "16/9", objectFit: "cover"}} onClick={() => setLargeViewOpened(true)}/>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <img
                    className={imgs[index] === activeImage ? Styles.active : Styles.inactive}
                    src={imgs[index]}
                    onClick={decrementIndex}
                />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                {
                    imgs[index+1]
                        ? <img
                            className={imgs[index+1] === activeImage ? Styles.active : Styles.inactive}
                            src={imgs[index+1]}
                            onClick={middle}
                        />
                        : null
                }
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                {
                    imgs[index+2]
                        ? <img
                            className={imgs[index+2] === activeImage ? Styles.active : Styles.inactive}
                            src={imgs[index+2]}
                            onClick={incrementIndex}
                        />
                        : null
                }
            </Grid>

            <Dialog open={largeViewOpened} onClose={() => {setLargeViewOpened(false)}}>
                <DialogContent>
                    <img src={activeImage}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={decrementIndex}>PROŠLA</Button>
                    <Button onClick={incrementIndex}>SLJEDEĆA</Button>
                </DialogActions>
            </Dialog>

        </Grid>
    );
}

export default Gallery;