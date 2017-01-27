import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ExercisesPage } from '../exercises/exercises';
import { ExerciseData } from '../../providers/exercise-data';

/**
  Class for the AddexercisePage page.
*/
@Component({
  templateUrl: 'addexercise.html'
})
export class AddexercisePage {

  newExerciseForm: any;
  types: any;
  units: any;

  /**
    [constructor description]
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public loadingCtrl: LoadingController,
               public exerciseData: ExerciseData,
               public alertCtrl: AlertController) {

    this.types = [ 'Weight', 'Gymnastic', 'Aerobic' ];
    this.units = [ 'Kg', 'Time', 'Reps' ];

    // validate form
    this.newExerciseForm = formBuilder.group({
      name: ['', Validators.required],
      pr: ['', Validators.required],
      type: [''],
      unit: ['']
    })
  }

  /**
    [addExercise description]
    call to service for add new exercise in the database
  */
  addExercise(){
    this.exerciseData.addExercise(
      this.newExerciseForm.value.name,
      this.newExerciseForm.value.pr,
      this.newExerciseForm.value.type,
      this.newExerciseForm.value.unit).then(() => {
        this.navCtrl.setRoot( ExercisesPage );
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
  }
}
