import React, {useEffect, useState} from 'react';
import {Add} from "@mui/icons-material";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {Divider, Grid} from "@mui/material";
import AdBrief from "./AdBrief";
import {fetchAllAds} from "../../networking/AdServices";
import {AdExpanded} from "../../interfaces/Interfaces";
import LinkButton from "../common/LinkButton";
import SoldBrief from "./SoldBrief";

function Oglasi() {
    const [ads, setAds] = useState<AdExpanded[]>([]);
    const [activeAds, setActiveAds] = useState<AdExpanded[]>([]);
    const [soldAds, setSoldAds] = useState<AdExpanded[]>([]);

    const [query, setQuery] = useState("");

    async function getAds(){
        const res = await fetchAllAds();
        setAds(res);
        const sold = res.filter((ad: AdExpanded) => {
            return ad.sold;
        });
        setSoldAds(sold);
        const active = res.filter((ad: AdExpanded) => {
            return !ad.sold;
        });
        setActiveAds(active);
    }

    useEffect(() => {
        getAds();
    }, []);

    return (
        <div style={{padding: "3rem", display: "grid", gap: "3rem"}}>
            <Grid container spacing={2}>
                <Grid item xl={2} lg={2} md={3} sm={4} xs={5.5}>
                    <h2 style={{fontSize:"2rem"}}>OGLASI</h2>
                </Grid>
                <Grid item xl={8} lg={8} md={6} sm={4} xs={0}/>
                <Grid item xl={2} lg={2} md={3} sm={4} xs={6}>
                    <LinkButton linkTo={"/admin/novi"} text={"NOVI OGLAS"} variant={"filled"} color={"red"} icon={<Add/>}/>
                </Grid>
            </Grid>

            <ReactSearchAutocomplete
                items={[]}
                onSearch={(keyword)=>{
                    setQuery(keyword.toLowerCase());
                }}
                placeholder={"Pretraži oglase"}
                styling={{borderRadius:"0", zIndex:1000}}
            />

            <Grid container spacing={2}>
                {
                    activeAds.filter((ad) => {return ad.title.toLowerCase().includes(query)}).map((item) => {
                        return (
                            <Grid item xl={12} lg={12} md={12} sm={6} xs={12}>
                                <AdBrief
                                    carID={item.id}
                                    thumbnail={item.images?.at(0)?.src64 || ""}
                                    adTitle={item.title}
                                    dateCreated={item.dateCreated || ''}
                                    price={item.price}
                                    adListRef={activeAds}
                                    adMutator={setActiveAds}
                                    images={item.images}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>

            <Divider>Prodato</Divider>

            <Grid container spacing={2}>
                {
                    soldAds.filter((ad) => {return ad.title.toLowerCase().includes(query)}).map((item) => {
                        return (
                            <Grid item xl={12} lg={12} md={12} sm={6} xs={12}>
                                <SoldBrief
                                    carID={item.id}
                                    thumbnail={item.images?.at(0)?.src64 || ""}
                                    adTitle={item.title}
                                    dateCreated={item.dateCreated || ''}
                                    price={item.price}
                                    adListRef={soldAds}
                                    adMutator={setSoldAds}
                                    images={item.images}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>

        </div>
    );
}

export default Oglasi;