import { Amenity } from './Amenity';

export class Room {
    _id: string;
    hotel_id: string;
    hotel_info?: {
        _id?: string;
        label: string
    };
    name: string;
    description: string;
    price: number;
    specials: {
        id: number;
        name: string;
    }
    images: string[];
    amenities: Amenity[];
    textFeatures: [];
}