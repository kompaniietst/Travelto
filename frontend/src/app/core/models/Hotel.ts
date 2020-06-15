import { Amenity } from './Amenity';

export class Hotel {
    _id: string;
    name: string;
    stars: number;
    description: string;
    address: {
        city: {
            _id?: string;
            label: string;
        }
        street: string;
        houseNumber: string;
        disctrict: string;
        map: number[];
    }
    images: string[];
    amenities: Amenity[];
}