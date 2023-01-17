import {Announcement} from "../interfaces/Interfaces";

export async function fetchAllAnnouncements(){
    const res = await fetch("http://localhost:5000/announcements?_sort=dateCreated&_order=desc");
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function deleteAnnouncementById(id: number){
    const res = await fetch(`http://localhost:5000/announcements/${id}`, {method: "DELETE"});
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Brisanje saopštenja nije uspjelo", status: res.status};
    }
}

export async function updateAnnouncement(newData: Announcement){
    const res = await fetch(`http://localhost:5000/announcements/${newData.id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newData)
        }
    );

    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Ažuriranje saopštenja nije uspjelo", status: res.status};
    }
}

interface NewAnnouncement{
    title: string;
    text: string;
    dateCreated: string;
}

export async function createNewAnnouncement(a: NewAnnouncement){
    const res = await fetch(`http://localhost:5000/announcements`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(a)
        }
    );
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Kreiranje novog saopštenja nije uspjelo", status: res.status};
    }
}