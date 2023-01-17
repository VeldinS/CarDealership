import React, {useLayoutEffect, useState} from 'react';
import {fetchAllOffers, Offer, OfferExpanded} from "../../networking/OfferServices";
import {useLocation} from "react-router-dom";
import OfferBrief from "./OfferBrief";

function Offers() {
    const [offers, setOffers] = useState<OfferExpanded[]>([]);

    useLayoutEffect(() => {
        getOffers();
    },[])

    async function getOffers(){
        const res = await fetchAllOffers();
        setOffers(res);
    }

    return (
        <div style={{padding: "3rem", display: "grid", gap: "3rem"}}>
            <h1>Ponude</h1>
            {
                offers.map((offer) => {
                    return <OfferBrief
                        thumbnail={offer.ad.images[0].src64}
                        adTitle={offer.ad.title}
                        adPrice={offer.ad.price}
                        offer={offer}
                        setter={setOffers}
                        offersList={offers}
                    />
                })
            }
        </div>
    );
}

export default Offers;