import React from 'react';
import {Link, NavLink} from "react-router-dom";
import ButtonRegular, {ButtonProps} from "./ButtonRegular";

interface LinkButtonProps extends ButtonProps{
    linkTo: string;
}

function LinkButton(props: LinkButtonProps) {
    return (
        <Link to={props.linkTo}>
            <ButtonRegular text={props.text} variant={props.variant} color={props.color} icon={props.icon}/>
        </Link>
    );
}

export default LinkButton;