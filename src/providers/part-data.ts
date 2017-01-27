import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/**
  Class for the PartData provider.
*/
@Injectable()
export class PartData {
  fireAuth : any;
  partsRef : any;
  sessionsRef : any;

  /**
    [constructor description]
  */
  constructor(public http: Http) {
    this.fireAuth = firebase.auth();

    this.partsRef = firebase.database().ref('/parts');
    this.sessionsRef = firebase.database().ref('/sessions');
  }

  /**
    [parts description]
    Get parts for specific block.
    @param {string} id  [Block's id]
  */
  parts( id : string ): Observable<any> {
    return Observable.create( observer => {

      // get training details
      let listener = this.partsRef.orderByChild("Block").equalTo(id).on('child_added', partSnap => {

        // get part and id
        let part = partSnap.val();
        part.Id = partSnap.key;

        // pass observer next object
        observer.next(part);
      }, observer.error);

      return () => {
        this.sessionsRef.off('child_added', listener);
      };
    });
  }

  /**
    [details description]
    Get details for specific part using block Id.
    @param {string} id  [part's id]
  */
  details( id : string ): Observable<any> {
    return Observable.create( observer => {

      // get part details
      let listener = this.partsRef.child(id).on('value', partSnap => {

        // get part value and add id using key
        let part = partSnap.val();
        part.Id = partSnap.key;

        // pass observer next object
        observer.next(part);

      }, observer.error);
      return () => {
        this.partsRef.off('value', listener);
      };
    });
  }

  /**
    [add description]
    add new block into session
    @param {string} idBlock  [Block's id]
    @param {string} description  [description of the part]
    @param {string} type  [type of exercise]
  */
  add( idBlock: string, description: string, type: string ){

    // a part entry
    var partData = {
      Block : idBlock,
      Description: description,
      Type: type
    };

    // get a key for a new part.
    var newPartKey = this.partsRef.push().key;

    // write the new parts's data simultaneously
    // in the parts list and the block's parts list.
    var updates = {};
    updates['/parts/' + newPartKey] = partData;
    updates['/blocks/' + idBlock + '/Parts/' + newPartKey] = true;

    return firebase.database().ref().update(updates);
  }

  /**
    [remove description]
    delete part in two diferente secction
    at the same time using updated value
    @param {string} blockId  [Block's id]
    @param {string} partId   [Part's id]
  */
  remove( blockId : string, partId : string ){

    // delete part in parts node and parts of the block
    // updating route by null
    var updates = {};
    updates['/blocks/' + blockId  + '/Parts/' + partId] = null;
    updates['/parts/' + partId ] = null;

    return firebase.database().ref().update(updates);
  }

  /**
    [removed description]
    create trigger if a part has been deleted
  */
  removed( ): Observable<any> {
    return Observable.create(observer => {

      let listener = this.partsRef.on('child_removed', snapshot => {
        observer.next(snapshot.key);
      }, observer.error);

      return () => {
        this.partsRef.off('child_removed', listener);
      };
    })
  }
}
