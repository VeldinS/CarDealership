export interface Ad{
    "title": string;
    "manufacturerId": number;
    "modelId": number;
    "price": number;
    "year": number;
    "mileage": number;
    "volume": number;
    "horsepower": number;
    "car_typeId": number;
    "fuel_typeId": number;
    "drive_typeId": number;
    "transmission": string;
    "lowestPrice": number;
    "emissionStandard": string;
    "color": string;
    "parkingCamera": string;
    "rimSize": number;
    "gears": string;
    "lights": string;
    "tyres": string;
    "doors": string;
    "registrationUntil": string;
    "description": string;
    "dateCreated": string;
    "images": Image[];
    "sold": boolean;
}

export interface AdExpanded extends Ad{
    "id": number;
    "manufacturer": Manufacturer;
    "model": Model;
    "car_type": SimpleType;
    "fuel_type": SimpleType;
    "drive_type": SimpleType;
}

export interface Country{
    id: number;
    name: string;
}

export interface Manufacturer{
    "name": string;
    "countryId": number;
}

export interface ManufacturerExpanded extends Manufacturer{
    id: number;
    country: Country;
}

export interface Model{
    "id": number;
    "name": string;
    "manufacturerId": number;
}

export interface SimpleType{
    id: number;
    type: string;
}

export interface Image{
    id: number;
    src64: string;
    adId: number;
}

export interface Announcement{
    id: number;
    title: string;
    text: string;
    dateCreated: string;
}

export interface Filters{
    "title"?: string;

    "manufacturerId"?: number;
    "models"?: string[]; //object

    "priceFrom"?: number;
    "priceTo"?: number;

    "yearFrom"?: number;
    "yearTo"?: number;

    "mileageFrom"?: number;
    "mileageTo"?: number;

    "volumeFrom"?: number;
    "volumeTo"?: number;

    "horsepowerFrom"?: number;
    "horsepowerTo"?: number;

    "carTypes"?: string[];
    "fuelTypes"?: string[];
    "driveTypes"?: string[];

    "transmissions"?: string[];
    "emissionStandards"?: string[];
    "colors"?: string[];
    "parkingCameras"?: string[];

    "rimSizeFrom"?: number;
    "rimSizeTo"?: number;

    "lights"?: string[];
    "tyres"?: string[];
    "doors"?: string[];
}

export function getDefaultFilters(): Filters{
    return{
        title: "",
        manufacturerId: 1,
        priceFrom: 0,
        priceTo: 0,
        yearFrom: 1990,
        yearTo: 2022,
        mileageFrom: 0,
        mileageTo: 0,
        volumeFrom: 1.0,
        volumeTo: 1.0,
        horsepowerFrom: 0,
        horsepowerTo: 0,
        rimSizeFrom: 13,
        rimSizeTo: 14,
    }
}