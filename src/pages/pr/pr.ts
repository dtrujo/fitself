import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ViewController, NavParams, AlertController } from 'ionic-angular';
import { ExerciseData } from '../../providers/exercise-data';

/**
  Class for the PrPage page.
*/
@Component({
  templateUrl: 'pr.html'
})
export class PrPage {
  newPrForm: any;
  exercise: any;
  types : any;
  units : any;
  selected: any;

  /**
    Constructor
  */
  constructor( private navCtrl: NavController,
               public formBuilder: FormBuilder,
               public navParams: NavParams,
               public exerciseData: ExerciseData,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController,
               public viewCtrl: ViewController) {

    // take exercises and checke correct type
    this.exercise = this.navParams.get("exercise");

    this.types = [ 'Weight', 'Aerobic', 'Gymnastic' ];
    this.units = [ 'Kg', 'Time', 'Reps' ];
    this.selected = { type: this.exercise.Type, unit: this.exercise.Unit }

    // validate form
    this.newPrForm = formBuilder.group({
      pr: ['', Validators.required],
      type: [''],
      unit: ['']
    })
  }

  /**
    [dismiss description]
    Close actual modal.
  */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
    [updatePr description]
    call firebase service to update pr value
    @param {string} exerciseId [exercise's id]
  */
  updatePr(exerciseId){

    // control if the form has been validated
    if (!this.newPrForm.valid){
      console.log(this.newPrForm.value);
    } else {

      this.exerciseData.updatePr(
        exerciseId,
        this.newPrForm.value.pr,
        this.newPrForm.value.type,
        this.newPrForm.value.unit
      ).then(() => {
          this.viewCtrl.dismiss();
      }, (error) => {

        var errorMessage: string = error.message;
        let alert = this.alertCtrl.create({

          message: errorMessage,
          buttons: [{
            text: "Ok",
            role: 'cancel'
          }]
        });

        alert.present();
      });

      /*let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });*/

      //loading.present();
    }
  }
}
