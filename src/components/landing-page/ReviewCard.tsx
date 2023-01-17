import React from 'react';
import {Card} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Styles from "./ReviewCard.module.css"

interface ReviewProps {
    username: string;
    date: string;
    title: string;
    review: string;
}

function ReviewCard(props: ReviewProps) {
    return (
        <Card className={Styles.reviewCard}>
            <div className={Styles.userInfo}>
                <AccountCircleIcon fontSize={"large"}/>
                <div>
                    <h4>{props.username}</h4>
                    <h4 style={{color: "var(--light-text)", fontWeight: "normal", fontSize: "0.8rem"}}>{props.date}</h4>
                </div>
            </div>
            <div>
                <h3>{props.title}</h3>
                <p>{props.review}</p>
            </div>
        </Card>
    );
}

export default ReviewCard;