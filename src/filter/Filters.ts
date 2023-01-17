import {AdExpanded, Filters} from "../interfaces/Interfaces";

export function advancedFilter(list: AdExpanded[], filters: Filters){

    console.log("INITIAL LIST", list);
    console.log("FILTERS", filters);

    const newList = list.filter((ad) => {

        console.log("AD -> ", ad);

        if(filters.title && !(ad.title.includes(filters.title))){
            console.log("TITLE DOESNT MATCH");
            return false
        }
        if(filters.manufacturerId && filters.manufacturerId !== 999  && !(filters.manufacturerId === ad.manufacturerId)){
            console.log("MANUFACTURER ID DOESNT MATCH");
            return false;
        }
        if(filters.models && filters.models.length > 0 && !(filters.models.includes(ad.model.name))){
            console.log("MODEL DOESNT MATCH");
            return false;
        }
        if(filters.priceFrom && filters.priceFrom > ad.price){
            console.log("PRICE FROM DOESNT MATCH");
            return false;
        }
        if(filters.priceTo && ad.price > filters.priceTo){
            console.log("PRICE TO DOESNT MATCH");
            return false;
        }
        if(filters.mileageFrom && ad.mileage < filters.mileageFrom){
            console.log("MILEAGE FROM DOESNT MATCH");
            return false;
        }
        if(filters.mileageTo && ad.mileage > filters.mileageTo){
            console.log("MILEAGE TO DOESNT MATCH");
            return false;
        }
        if(filters.volumeFrom && ad.volume < filters.volumeFrom){
            console.log("VOLUME FROM DOESNT MATCH");
            return false;
        }
        if(filters.volumeTo && ad.volume > filters.volumeTo){
            console.log("VOLUME TO DOESNT MATCH");
            return false;
        }
        if(filters.horsepowerFrom && ad.horsepower < filters.horsepowerFrom){
            console.log("HP FROM DOESNT MATCH");
            return false;
        }
        if(filters.horsepowerTo && ad.horsepower > filters.horsepowerTo){
            console.log("HP TO DOESNT MATCH");
            return false;
        }
        if(filters.carTypes && !(filters.carTypes.includes(ad.car_type.type))){
            console.log("CAR TYPE DOESNT MATCH");
            return false;
        }
        if(filters.fuelTypes && !(filters.fuelTypes.includes(ad.fuel_type.type))){
            console.log("FUEL TYPE DOESNT MATCH");
            return false;
        }
        if(filters.driveTypes && !(filters.driveTypes.includes(ad.drive_type.type))){
            console.log("DRIVE TYPE DOESNT MATCH");
            return false;
        }
        if(filters.transmissions && !(filters.transmissions.includes(ad.transmission))){
            console.log("TRANSMISSION DOESNT MATCH");
            return false;
        }
        if(filters.emissionStandards && !(filters.emissionStandards.includes(ad.emissionStandard))){
            console.log("EURO DOESNT MATCH");
            return false;
        }
        if(filters.colors && !(filters.colors.includes(ad.color))){
            console.log("COLOR DOESNT MATCH");
            return false;
        }
        if(filters.parkingCameras && !(filters.parkingCameras.includes(ad.parkingCamera))){
            console.log("CAMERA DOESNT MATCH");
            return false;
        }
        if(filters.rimSizeFrom && ad.rimSize < filters.rimSizeFrom){
            console.log("RIM SIZE FROM DOESNT MATCH");
            return false;
        }
        if(filters.rimSizeTo && ad.rimSize > filters.rimSizeTo){
            console.log("RIM SIZE TO DOESNT MATCH");
            return false;
        }
        if(filters.lights && !(filters.lights.includes(ad.lights))){
            console.log("LIGHTS LIST DOESNT MATCH");
            return false;
        }
        if(filters.tyres && !(filters.tyres.includes(ad.tyres))){
            console.log("TYRES LIST DOESNT MATCH");
            return false;
        }
        if(filters.doors && !(filters.doors.includes(ad.doors))){
            console.log("DOORS LIST DOESNT MATCH");
            return false;
        }
        return true;
    })
    return newList;
}