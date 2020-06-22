import { Amenity } from './Amenity';

export class Room {
    _id: string;
    hotel_id: string;
    name: string;
    description: string;
    price: number;
    specials: [{
        _id: string;
        label: string;
    }]
    images: string[];
    amenities: Amenity[];
    textFeatures: [];
}