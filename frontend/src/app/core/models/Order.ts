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
    clientId: string;
    status: string;
}