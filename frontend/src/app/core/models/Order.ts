export class Order {
    _id?: string;
    room_id: string;
    room_name: string;
    price: number;
    image: string;
    date: number[];
    nights: number;
    pex: {
        adults: number;
        children: number;
        ages: number[]
    }
    owner_id: string;
    hotel: {
        _id: string;
        label: string;
        stars: number;
        address: {
            city: {
                _id: string;
                label: string;
            },
            street: string;
            houseNumber: number;
        }
    }
    user: {
        _id: string;
        email: string;
        firstname: string;
        lastname: string;
        phone: string;
        image: string;
    }
    reserved: Date;
    completed: Date;
    canceled: Date;
    clientId?: string;
    status: string;
}