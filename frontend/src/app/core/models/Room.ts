import { Amenity } from './Amenity';
import { Feedback } from './Feedback';

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
    textFeatures: [];
    hotel?: {
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
            houseNumber: number;
            disctrict: string;
            map: number[];
        }
        images: string[];
        amenities: Amenity[];
        feedbacks: Feedback[]
    };
    creator: string;
}