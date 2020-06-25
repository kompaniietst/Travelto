export class User {
    _id?: string;
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
    phone?: string;
    city?: string;
    image?: string;
    role: string;

    tokens?: string;
}