import React, {useState} from 'react';

import bg from "../../img/a5.jpg"
import {Card, TextField} from "@mui/material";
import Styles from "../landing-page/SalesForm.module.css";
import ButtonRegular from "../common/ButtonRegular";
import LinkButton from "../common/LinkButton";
import {useNavigate} from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", position: "relative"}}>
            <img src={bg} style={{height: "100%", width: "100%", objectFit: "cover"}}/>
            <Card style={{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem 4rem", zIndex: 999}}>
                <div style={{textAlign: "center", display: "grid", gap: "1rem"}}>
                    <h1>PRIJAVITE SE</h1>
                    <TextField
                        className={Styles.input}
                        type={"text"}
                        placeholder={"Korisničko ime"}
                        label={"Korisničko ime"}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <TextField
                        className={Styles.input}
                        type={"password"}
                        placeholder={"Šifra"}
                        label={"Šifra"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <ButtonRegular
                        text={"PRIJAVI SE"}
                        variant={"filled"}
                        color={"red"}
                        onClick={() => {
                            if(username !== "admir_h"){
                                alert("Korisničko ime nije validno");
                                return;
                            }
                            if(password !== "adem888"){
                                alert("Šifra nije tačna");
                                return;
                            }
                            navigate("/admin");
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}

export default AdminLogin;