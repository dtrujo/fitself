import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { SessionDetailsPage } from '../session-details/session-details';
import { AddSessionPage } from '../add-session/add-session';
import { TrainingData } from '../../providers/training-data';
import { SessionData } from '../../providers/session-data';

@Component({
  selector: 'page-training-details',
  templateUrl: 'training-details.html'
})
export class TrainingDetailsPage implements OnInit, OnDestroy {
  training : any;
  sessions : Array<any> = [];
  sessionsSubs : any;
  sessionDeleteSubs : any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public trainingData: TrainingData,
               public alertCtrl: AlertController,
               public actionSheetCtrl: ActionSheetController,
               public sessionData: SessionData,
               public ngZone: NgZone,
               public params: NavParams ) {

    // retrived params using NavParams
    this.training = this.params.get("training");

    // remove the session of the list the value
    // which was removed in firebase.
    this.sessionDeleteSubs = this.sessionData.removed().subscribe( id => {
      this.ngZone.run(() => {
        let i = 0, index = 0;
        this.sessions.forEach(function(session) {
            if (id == session.Id)
              index = i;
            i++;
        });
        this.sessions.splice(index, 1);
      });
    });
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
    When fire we need to retrieved the sessions calling
    the services.
  */
  ngOnInit() {
    this.sessionsSubs = this.sessionData.sessions( this.training.Id ).subscribe ( session => {
      this.ngZone.run(() => {
        this.sessions.push(session);
      });
    });
  }

  /**
    [ngOnDestroy description]
    Destroy subscription when the view
    is detroyed. Not duplicate responses
  */
  ngOnDestroy() {
    this.sessionsSubs.unsubscribe();
    this.sessionDeleteSubs.unsubscribe();
  }


  /**
    [presentActionSheet description]
    Create and show secondary actions
  */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Training Actions',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Edit clicked');
          }
        },{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  /**
    [goToAddSession description]
    go to add session page
  */
  goToAddSession() {
    this.navCtrl.push( AddSessionPage, { id : this.training.Id } );
  }

  /**
    [sessionDetails description]
    go to sesion details page
    @param {session} session get details
  */
  sessionDetails( session ) {
    this.navCtrl.push(SessionDetailsPage, { session : session });
  }

  /**
    [deleteSession description]
    remove session to the training list
    @param {session} session delete
  */
  deleteSession ( session ){
    // create alert to confirm delete
    // the selected training
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete the session?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.sessionData.remove( session );
          }
        }
      ]
    });

    alert.present();
  }
}
