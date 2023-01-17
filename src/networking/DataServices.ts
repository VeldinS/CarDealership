import {Manufacturer, ManufacturerExpanded} from "../interfaces/Interfaces";

export async function fetchAllManufacturers(){
    const res = await fetch("http://localhost:5000/manufacturers?_expand=country");
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchManufacturersWithModels(){
    const res = await fetch("http://localhost:5000/manufacturers?_expand=country&_embed=models");
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchManufacturerById(id: number){
    const res = await fetch(`http://localhost:5000/manufacturers/${id}`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function createNewManufacturer(manufacturer: Manufacturer){
    const res = await fetch(`http://localhost:5000/manufacturers`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(manufacturer)
        }
    );
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Kreiranje novog proizvođača nije uspjelo", status: res.status};
    }
}

export async function updateManufacturer(newData: Manufacturer, id: number){
    const res = await fetch(`http://localhost:5000/manufacturers/${id}`,
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
        return {error: "Ažuriranje proizvođača nije uspjelo", status: res.status};
    }
}

export function getDummyManufacturer() : ManufacturerExpanded{
    return{
        id: 0,
        name: "",
        countryId: 1,
        country: {
            "id": 1,
            "name": "Njemačka"
        }
    }
}

export async function fetchAllModels(){
    const res = await fetch("http://localhost:5000/models?_expand=manufacturer");
    if(res.ok){
        return res.json();
    }
    else {
        return {werror: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchModelById(id: number){
    const res = await fetch(`http://localhost:5000/models/${id}/?_expand=manufacturer`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchManufacturersByCountry(countryId: number){
    const res = await fetch(`http://localhost:5000/countries/${countryId}?_embed=manufacturers`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchAllCarTypes(){
    const res = await fetch(`http://localhost:5000/car_types`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchAllFuelTypes(){
    const res = await fetch(`http://localhost:5000/fuel_types`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchAllDriveTypes(){
    const res = await fetch(`http://localhost:5000/drive_types`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

export async function fetchAllCountries(){
    const res = await fetch("http://localhost:5000/countries");
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Pretraga nije uspjela", status: res.status};
    }
}

