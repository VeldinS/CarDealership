import {AdExpanded, Manufacturer} from "../interfaces/Interfaces";

export interface Offer{
    username: string;
    adId: number;
    message: string;
    offer: number;
    response: "accepted" | "rejected" | "pending";
}

export interface OfferExpanded extends Offer{
    ad: AdExpanded;
    id: number;
}

export async function fetchAllOffers(){
    const res = await fetch("http://localhost:5000/offers?_expand=ad");
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Kreiranje novog proizvođača nije uspjelo", status: res.status};
    }
}

export async function createNewOffer(offer: Offer){
    const res = await fetch(`http://localhost:5000/offers`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(offer)
        }
    );
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Kreiranje novog proizvođača nije uspjelo", status: res.status};
    }
}

export async function updateOffer(offer: Offer, id: number){
    const res = await fetch(`http://localhost:5000/offers/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(offer)
        }
    );

    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Ažuriranje ponude nije uspjelo", status: res.status};
    }
}