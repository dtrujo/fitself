/**
 * 
 */
export class User{

    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    surname: string;
    city: string;
    birthday: string;
    international: boolean;
    tall: number;
    weight: number;

    /**
     * 
     */
    constructor( 
        _id: string, _name: string, 
        _email: string, _password: string, 
        _username: string, _surname: string,
        _city: string, _birthday: string,
        _international: boolean, _tall: number,
        _weight: number
    ){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.surname = _surname;
        this.city = _city;
        this.birthday = _birthday;
        this.international = _international;
        this.tall = _tall;
        this.weight = _weight;
    }
}