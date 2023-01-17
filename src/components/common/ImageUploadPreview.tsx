import React, {MouseEventHandler, useState} from 'react';
import {RemoveCircleOutlined} from "@mui/icons-material";
import {Tooltip} from "@mui/material";

interface IUPProps{
    src64: string;
    onRemove?: MouseEventHandler;
}

function ImageUploadPreview(props: IUPProps) {
    const [showRemove, setShowRemove] = useState(false);

    return (
        <div onMouseOver={() => setShowRemove(true)} onMouseLeave={() => setShowRemove(false)} style={{width: "100%", position: "relative"}}>
            <img src={props.src64} style={{objectFit: "cover", width: "100%", aspectRatio: "16/9"}} loading={"lazy"}/>
            {
                showRemove && (
                    <div style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 1000, backgroundColor: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid red"}}>
                        <Tooltip title={"Ukloni sliku"}>
                            <RemoveCircleOutlined fontSize={"large"} style={{color: "red"}} onClick={props?.onRemove}/>
                        </Tooltip>
                    </div>
                )
            }
        </div>
    );
}

export default ImageUploadPreview;