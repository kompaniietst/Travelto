import { Amenity } from './Amenity';
import { Feedback } from './Feedback';

export class Hotel {
    _id: string;
    name: string;
    stars: number;
    description: string;
    address: {
        city: {
            _id?: string;
            name: string;
        }
        street: string;
        houseNumber: number;
        disctrict: string;
        map: number[];
    }
    images: string[];
    amenities: Amenity[];
    feedbacks: Feedback[];
    creator: string;
}