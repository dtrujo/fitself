/**
 * 
 */
export class Config{

    friends: number;
    exercises: number;
    trainings: number;
    imageBoxW: string;
    imageBoxB: string;

    /**
     * 
     */
    constructor( 
        _friends: number = null, _exercises: number = null, 
        _trainings: number = null, _imageBoxW: string = null, 
        _imageBoxB: string = null
    ){
        this.friends = _friends;
        this.exercises = _exercises;
        this.trainings = _trainings;
        this.imageBoxW = _imageBoxW;
        this.imageBoxB = _imageBoxB;
    }
}