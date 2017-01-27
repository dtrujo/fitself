import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ExerciseData {
  fireAuth : any;
  userProfile : any;
  exercisesRef: any;

  /**
    constructor
  */
  constructor(private http : Http) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/users');
  }

  /**
    [exercises description]
    Get all exercises in the firebase database using observer
    to detect when element has been added or modified.
  */
  exercises(): Observable<any> {
    return Observable.create( observer => {

      var userId = this.fireAuth.currentUser.uid;
      this.exercisesRef = this.userProfile.child(userId + '/exercises');

      let listener = this.exercisesRef.on('child_added', snapshot => {

        let data = snapshot.val();
        data.id = snapshot.key;
        observer.next(data);

      }, observer.error);

      return () => {
        this.exercisesRef.off('child_added', listener);
      };
    });
  }

  /**
    [remove description]
    add event to check when one node has been removed
  */
  remove(): Observable<any> {
    return Observable.create(observer => {

      var userId = this.fireAuth.currentUser.uid;
      this.exercisesRef = this.userProfile.child(userId + '/exercises');

      let listener = this.exercisesRef.on('child_removed', snapshot => {
        observer.next(snapshot.key);
      }, observer.error);

      return () => {
        this.exercisesRef.off('child_removed', listener);
      };
    });
  }

  /**
    [update description]
    add event to check when one node has been updated
  */
  update(): Observable<any> {
    return Observable.create(observer => {

      var userId = this.fireAuth.currentUser.uid;
      this.exercisesRef = this.userProfile.child(userId + '/exercises');

      let listener = this.exercisesRef.on('child_changed', snapshot => {

        let value = snapshot.val();
        value.id = snapshot.key;
        observer.next(value);

      }, observer.error);

      return () => {
        this.exercisesRef.off('child_changed', listener);
      };
    });
  }

  /**
    [updatePR description]
    update pr value using actual param.
    @param {string} exerciseId [exercise's id]
    @param {number} newPr      [value of the new pr]
    @param {string} type       [type of the value]
    @param {string} unit       [unit of the value]
  */
  updatePr( exerciseId: string, newPr: number, type: string, unit: string ): any {
    var userId = this.fireAuth.currentUser.uid;

    // return updated value
    return this.userProfile.child(userId + '/exercises/' + exerciseId).update({
      Pr : newPr,
      Type: type,
      Unit: unit
    })
  }

  /**
    [addExercise description]
    add new exercise into exercise's list
    @param {string} exerciseId [exercise's id]
    @param {number} newPr      [value of the new pr]
    @param {string} type       [type of the value]
    @param {string} unit       [unit of the value]
  */
  addExercise( name: string, pr: number, type: string, unit: string ){
    var userId = this.fireAuth.currentUser.uid;

    return this.userProfile.child(userId + '/exercises/').push({
      Name: name,
      Type: type,
      Unit: unit,
      Pr: pr,
      Date: new Date().toDateString()
    });
  }

  /**
    [removeExercise description]
    delete exercise of the list
    @param {string} id  [exercise's id] 
  */
  removeExercise( id: string ){
    var userId = this.fireAuth.currentUser.uid;
    this.userProfile.child(userId + '/exercises/' + id).remove();

    return true;
  }
}
