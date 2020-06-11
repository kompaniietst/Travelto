import { Amenity } from './Amenity';

export class Hotel {
    _id: string;
    name: string;
    stars: number;
    description: string;
    address: {
        city: string;
        street: string;
        disctrict: string;
    }
    map: number[];
    images: string[];
    amenities: Amenity[];
}