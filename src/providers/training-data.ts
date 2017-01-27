import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { SessionData } from '../providers/session-data';

/**
  Class for the TrainingData provider.
*/
@Injectable()
export class TrainingData {

  fireAuth : any;
  trainingsRef : any;
  sessionsRef : any;
  blocksRef : any;

  /**
    [constructor description]
  */
  constructor( public sessionData: SessionData , public http: Http) {

    this.fireAuth = firebase.auth();
    this.trainingsRef = firebase.database().ref('/trainings');
    this.blocksRef = firebase.database().ref('/blocks');
    this.sessionsRef = firebase.database().ref('/sessions');
  }

  /**
    [trainings description]
    Get all trainings in the firebase database using observer
    to detect when element has been added or modified.
  */
  trainings(): Observable<any> {
    return Observable.create( observer => {

      // get actual user
      var userId = this.fireAuth.currentUser.uid;

      // get child training
      let listener = this.trainingsRef.orderByChild("User").equalTo(userId).on('child_added', snapshot => {

        // get training and id
        let training = snapshot.val();
        training.Id = snapshot.key;
        observer.next(training);

      }, observer.error);

      return () => {
        this.trainingsRef.off('child_added', listener);
      };
    });
  }

  /**
    [update description]
    add event to check when one node has been updated
  */
  update(): Observable<any> {
    return Observable.create(observer => {

      let listener = this.trainingsRef.on('child_changed', snapshot => {

        let value = snapshot.val();
        value.id = snapshot.key;
        observer.next(value);

      }, observer.error);

      return () => {
        this.trainingsRef.off('child_changed', listener);
      };
    });
  }

  /**
    [details description]
    Get details for specific training.
    @param {string} id  [Training's id]
  */
  details( id : string ): Observable<any> {
    return Observable.create( observer => {

      // get training details
      let listener = this.trainingsRef.child(id).on('value', trainingSnap => {

        // get training and id
        let training = trainingSnap.val();
        training.Id = trainingSnap.key;

        // pass observer next object
        observer.next(training);
      }, observer.error);

      return () => {
        this.trainingsRef.off('value', listener);
      };
    });
  }

  /**
    [add description]
    add new training into notebook's list
    @param  {string} title        [Training's title]
    @param  {string} description  [Training's description]
    @param  {string} date         [Training's date]
  */
  add( title: string, description: string, date: string ){
    var userId = this.fireAuth.currentUser.uid;

    return this.trainingsRef.push({
      Title: title,
      Description: description,
      Date: date,
      User: userId
    });
  }

  /**
    [remove description]
    delete training in the diferent sections
    at the same time using updated value
    @param {training} training [training to delete]
  */
  remove( training : any ){

    // copy this to call into firebase service
    var _this = this;

    // delete training in trainings node
    var updates = {};

    updates['/trainings/' + training.Id ] = null;

    // delete all part before to delete the blockId
    // because if we delete the block, we need
    // to delete parts in the correct list
    this.sessionsRef.orderByChild('Training').equalTo(training.Id).once("value", function(sessionSnap){
       sessionSnap.forEach(function(data){
          let session = data.val();
          session.Id = data.key;
          _this.sessionData.remove(session);
       });
    });

    // delete
    return firebase.database().ref().update(updates);
  }

  /**
    [removed description]
    create trigger if a training has been deleted
  */
  removed(): Observable<any> {
    return Observable.create(observer => {

      let listener = this.trainingsRef.on('child_removed', snapshot => {
        observer.next(snapshot.key);
      }, observer.error);

      return () => {
        this.trainingsRef.off('child_removed', listener);
      };
    })
  }
}
