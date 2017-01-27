import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PartData } from '../providers/part-data';
import firebase from 'firebase';

/**
  Class for the TrainingData provider.
*/
@Injectable()
export class BlockData {
  fireAuth : any;
  blocksRef : any;
  partsRef : any;

  /**
    [constructor description]
  */
  constructor( public partData: PartData, public http: Http ) {
    this.fireAuth = firebase.auth();

    this.blocksRef = firebase.database().ref('/blocks');
    this.partsRef = firebase.database().ref('/parts');
  }

  /**
    [blocks description]
    Get blocks for specific session.
    @param {string} id  [Session's id]
  */
  blocks( id : string ): Observable<any> {
    return Observable.create( observer => {

      // get training details
      let listener = this.blocksRef.orderByChild("Session").equalTo(id).on('child_added', blockSnap => {

        // get block and id
        let block = blockSnap.val();
        block.Id = blockSnap.key;

        // create empty parts to retrive parts
        let parts = [];

        // call service and subscriber to complete parts
        this.partData.parts( block.Id ).subscribe((data) => {
          parts.push(data);
        });

        // add parts into parts blocks
        block.Parts = parts;

        // pass observer next object
        observer.next(block);

      }, observer.error);
      return () => {
        this.blocksRef.off('child_added', listener);
      };
    });
  }

  /**
    [details description]
    Get details for specific block using session Id.
    @param {string} id [the block's id]
  */
  details( id : string ): Observable<any> {
    return Observable.create( observer => {

      // get training details
      let listener = this.blocksRef.child(id).on('value', blockSnap => {

        let block = blockSnap.val();
        block.Id = blockSnap.key;

        // control if the training has sessions
        if (block.Parts){

          // clear the blocks array
          block.Parts = [];

          // get sessions in this training
          this.partsRef.orderByChild("Part").equalTo(block.Id).once('value', partsSnap => {

            // if have session, we need to convert [object, object] to array
            if (partsSnap.val())
              block.Parts = Object.keys(partsSnap.val()).map(function(k){return partsSnap.val()[k]});
          });
        }

        // pass observer next object
        observer.next(block);
      }, observer.error);

      return () => {
        this.blocksRef.off('value', listener);
      };
    });
  }

  /**
    [add description]
    add new block into session
    @param {string} sessionId   [the id of the session]
    @param {string} title       [title of the block]
    @param {string} description [description of the block]
  */
  add( sessionId : string, title: string, description: string ){

    // A block entry
    var blockData = {
      Session : sessionId,
      Title: title,
      Description: description
    };

    // get a key for a new block
    var newBlockKey = this.blocksRef.push().key;

    // write the new block's data simultaneously
    // in the blocks list and the sessions's blocks list.
    var updates = {};
    updates['/blocks/' + newBlockKey] = blockData;
    updates['/sessions/' + sessionId + '/Blocks/' + newBlockKey] = true;

    return firebase.database().ref().update(updates);
  }

  /**
    [remove description]
    delete block in two diferente section
    at the same time using updated value
    @param {string} sessionId [session's id]
    @param {string} blockId   [block's id]
  */
  remove( sessionId : string, blockId : string ){

    // copy $scope to call into firebase service
    var _this = this;

    // delete block in blocks node and blocks of the session
    // updating route by null
    var updates = {};

    updates['/sessions/' + sessionId  + '/Blocks/' + blockId] = null;
    updates['/blocks/' + blockId ] = null;

    // delete all part before to delete the blockId
    // because if we delete the block, we need
    // to delete parts in the correct list
    this.partsRef.orderByChild('Block').equalTo(blockId).once("value", function(partSnap){
       partSnap.forEach(function(part){
          _this.partData.remove(blockId, part.key);
       });
    });

    // delete values
    return firebase.database().ref().update(updates);
  }

  /**
    [removed description]
    create trigger if a part has been deleted
  */
  removed( ): Observable<any> {
    return Observable.create(observer => {

      let listener = this.blocksRef.on('child_removed', snapshot => {
        observer.next(snapshot.key);
      }, observer.error);

      return () => {
        this.blocksRef.off('child_removed', listener);
      };
    })
  }
}
