import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController , ActionSheetController, AlertController} from 'ionic-angular';
import { TrainingDetailsPage } from '../training-details/training-details';
import { AddTrainingPage } from '../add-training/add-training';
import { TrainingData } from '../../providers/training-data';

/**
  Class for the AddTrainingPage page.
*/
@Component({
  selector: 'page-notebook',
  templateUrl: 'notebook.html'
})
export class NotebookPage implements OnInit, OnDestroy {
  trainings : Array<any> = [];
  trainingDeleteSubs : any;

  /**
    Constructor
  */
  constructor ( public navCtrl: NavController,
                public trainingData: TrainingData,
                public alertCtrl: AlertController,
                public actionSheetCtrl: ActionSheetController,
                public ngZone: NgZone ) {

    // remove the training of the list the value
    // which was removed in firebase.
    this.trainingDeleteSubs = this.trainingData.removed().subscribe( id => {
      this.ngZone.run(() => {
        let i = 0, index = 0;
        this.trainings.forEach(function(training) {
            if (id == training.Id)
              index = i;
            i++;
        });
        this.trainings.splice(index, 1);
      });
    });

    // add new method to check if one node has been
    // modified in firebase and later update view. We use
    // observer to subscribe at the event
    this.trainingData.update().subscribe( (data) => {
      this.ngZone.run(() => {

        console.log('updated');
        this.trainings.forEach(function(training) {
          if (data.id == training.id)
            training = data;
        });

      });
    }, (err) => {
      console.error(err);
    });

  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {

    // get all trainings using an observer and add
    // trainings using push method with the value
    // retrieved of firebase
    this.trainingData.trainings().subscribe(training => {
      this.ngZone.run(() => {
        this.trainings.push(training);
      });
    });
  }

  /**
    [ngOnDestroy description]
    Destroy subscription when the view
    is detroyed. Not duplicate responses
  */
  ngOnDestroy() {
    this.trainingDeleteSubs.unsubscribe();
  }

  /**
    [presentActionSheet description]
    Create and show secondary actions
  */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Notebook Actions',
      buttons: [
        {
          text: 'Add',
          handler: () => {
            this.navCtrl.push( AddTrainingPage );
          }
        },{
          text: 'Search',
          handler: () => {
            console.log('Search clicked');
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
    [trainingDetails description]
    go to training details page
    @param {training} training [the training]
  */
  trainingDetails( training ){
    this.navCtrl.push( TrainingDetailsPage, { training : training } );
  }

  /**
    [deleteTraining description]
    delete specific training
    @param {training} training [training to delete]
  */
  deleteTraining(training) {

    // create alert to confirm delete
    // the selected training
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete the training?',
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
            this.trainingData.remove( training );
          }
        }
      ]
    });
    alert.present();
  }
}
