export class Feedback {
    _id?: string;
    name?: string;
    room?: {
        _id: string;
        name: string;
    }
    date: string;
    text: string;
}