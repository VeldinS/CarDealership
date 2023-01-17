import React, {useRef, useState} from 'react';
import {Grid, Tooltip} from "@mui/material";
import ImageUploadPreview from "../common/ImageUploadPreview";
import {AddCircleOutline} from "@mui/icons-material";
import {convertToBase64} from "../../networking/ImageServices";

interface ImageUploaderProps{
    encodedImages: any[];
    encodedImagesMutator: Function;
}

function ImageUploader(props: ImageUploaderProps) {
    const hiddenInputRef = useRef<HTMLInputElement>(null);


    async function uploadImages(e: any){
        const temp = [...props.encodedImages];
        for(const file of e.target.files){
            const file64 = await convertToBase64(file);
            temp.push(file64);
        }
        props.encodedImagesMutator(temp);
    }

    return (
        <div>
            <input type={"file"} accept={"image/jpeg, image/png"} multiple onChange={(e)=>{uploadImages(e)}}/>

            <Grid container spacing={2}>
                {
                    props.encodedImages.map((img) => {
                        return (
                            <Grid item xl={2}>
                                <ImageUploadPreview src64={img} onRemove={() => {
                                    let temp = props.encodedImages.filter((item) => item !== img);
                                    props.encodedImagesMutator(temp);
                                }}/>
                            </Grid>
                        )
                    })
                }
                <Grid item xl={2}>
                    {
                        props.encodedImages.length > 0 && (
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fafafaaa", height: "100%"}}>
                                <input
                                    ref={hiddenInputRef}
                                    type={"file"}
                                    accept={"image/jpeg, image/png"}
                                    multiple style={{display: "none"}}
                                    onChange={(e) => {
                                        uploadImages(e);
                                    }}
                                />
                                <Tooltip title={"Dodaj slike"}>
                                    <AddCircleOutline fontSize={"large"} style={{color: "#fa0000"}} onClick={() => {
                                        hiddenInputRef?.current?.click();
                                    }}/>
                                </Tooltip>
                            </div>
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default ImageUploader;