import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StorageData } from './storage-data';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  fireAuth : any;
  userProfile : any;
  authRef: any;

  /**
    Constructor
  */
  constructor( private http : Http,
               public ngZone: NgZone,
               public storageData: StorageData ) {

      this.fireAuth = firebase.auth();
      this.userProfile = firebase.database().ref('/users');
  }

  /**
    [loginUser description]
    We'll take an email and password and log the user into the firebase app]
    @param  {string} email    [User's email address]
    @param  {string} password [User's password]
  */
  loginUser( email: string, password: string ): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
    [signupUser description]
    This function will take the user's email and password and create a new account on
    the Firebase app, once it does it's going to log the user in and create a node on
    userProfile/uid with the user's email address, you can use
    that node to store the profile information.
    @param {string} email    [User's email address]
    @param {string} password [User's password]
    @param {string} username [User's username]
    @param {string} name     [User's name]
    @param {string} surname  [User's surname]
  */
  signupUser( email: string, password: string, username: string, name: string, surname: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {

        // add element information to user profile
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          username: username,
          name: name,
          surname: surname
        });

        // actual date
        let date = new Date();
        let toDateString = date.toDateString();

        // list of exercises
        let listOfExercises = [
          { 'Name': 'Back Squat', 'Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Deadlift','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Bench Press','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Front Squat','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Snatch','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Power Snatch','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Snatch Balance','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Clean','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Power Clean','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Push Press','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Push Jerk','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Split Jerk','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Overhead Squat','Type': 'Weight', 'Unit': 'Kg', 'Pr': '0', 'Date' : toDateString },
          { 'Name': 'Max. Pull Ups','Type': 'Gymnastic', 'Unit': 'Reps', 'Pr': '0', 'Date' : toDateString },
          { 'Name': '5Km Run','Type': 'Aerobic', 'Unit': 'Time', 'Pr': '0', 'Date' : toDateString },
        ];

        // add exercise list to user
        listOfExercises.forEach(function(exercise) {
            this.userProfile.child(authenticatedUser.uid + '/exercises').push( exercise );
        }, this);
      });
    });
  }

  /**
    [resetPassword description]
    This function will take the user's email address and send a password reset
    link, then Firebase will handle the email reset part, you won't have
    to do anything else.
    @param {string} email [User's email address]
  */
  resetPassword( email: string ): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  /**
    [logoutUser description]
    logout user calling to firebase signout function.
  */
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

  /**
    [user description]
    get all user information using the id. We need access to image url
    using storage method in the firebase storage lib.
    @param {string} id [User's id to retrive information]
  */
  user( id: string ): any{
    return Observable.create(observer => {

      this.authRef = this.userProfile.child(id);
      let listener = this.authRef.on('value', snapshot => {

        // save user general data
        let userData = snapshot.val();

        // get url download image using observable element
        this.storageData.image(userData.image).subscribe(url => {
            userData.image = url;
            observer.next(userData);
        });
      }, observer.error);

      return () => {
        this.authRef.off('value', listener);
      };
    });
  }
}
