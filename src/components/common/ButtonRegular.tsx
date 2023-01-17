import React from 'react';
import Styles from "./ButtonRegular.module.css";

export interface ButtonProps{
    text: string;
    variant: "filled" | "outlined";
    color: "red" | "green" | "blue";
    icon?: any;
    onClick?: () => any;
}

function ButtonRegular(props: ButtonProps) {
    const paddingLeft = props.icon ? "0.6rem" : undefined;
    return (
        <button
            className={props.variant === "outlined" ? Styles.buttonOutlined : Styles.buttonFilled}
            style={props.variant === "outlined" ? {
                boxShadow: `inset 0px 0px 0px 4px var(--light-${props.color})`,
                color: `var(--light-${props.color})`,
                fontWeight: "600",
                paddingLeft: paddingLeft,
            } : {
                backgroundColor: `var(--light-${props.color})`,
                paddingLeft: paddingLeft,
            }}
            onClick={props.onClick}
        >
            {props.icon}
            {props.text}
        </button>
    );
}

export default ButtonRegular;