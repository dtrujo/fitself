import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { PrPage } from '../pr/pr';
import { AddexercisePage } from '../addexercise/addexercise';
import { ExerciseData } from '../../providers/exercise-data';

@Component({
  templateUrl: 'exercises.html'
})
export class ExercisesPage implements OnInit, OnDestroy {

  userProfile : any;
  type : string;

  exercises_weight: Array<any> = [];
  exercises_aerobic: Array<any> = [];
  exercises_gymnastic: Array<any> = [];

  subscription : any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public modalCtrl: ModalController,
               public ngZone: NgZone,
               public exerciseData: ExerciseData,
               public alertCtrl: AlertController ) {

    this.type = "Weight";

    // add new method to check if one node has been
    // modified in firebase and later update view. We use
    // observer to subscribe at the event
    this.exerciseData.update().subscribe((data) => {
      this.ngZone.run(() => {

        // control list
        switch (data.Type) {
          case "Weight":
            this.exercises_weight.forEach(function(exercise) {
              if (data.id == exercise.id){
                exercise.Pr = data.Pr;
                exercise.Name = data.Name;
                exercise.Type = data.Type;
                exercise.Unit = data.Unit;
              }
            });
            break;
          case "Aerobic":
            this.exercises_aerobic.forEach(function(exercise) {
              if (data.id == exercise.id){
                exercise.Pr = data.Pr;
                exercise.Name = data.Name;
                exercise.Type = data.Type;
                exercise.Unit = data.Unit;
              }
            });
            break;
          case "Gymnastic":
            this.exercises_gymnastic.forEach(function(exercise) {
              if (data.id == exercise.id){
                exercise.Pr = data.Pr;
                exercise.Name = data.Name;
                exercise.Type = data.Type;
                exercise.Unit = data.Unit;
              }
            });
            break;
          default:
            console.log('default');
        }
      });

    }, (err) => {
      console.error(err);
    });

    // remove of the exercise'list the value
    // which was removed in firebase.
    this.subscription = this.exerciseData.remove().subscribe((id) => {
      let i = -1;
      let e = {'index' : -1, "type" : ''};

      this.exercises_weight.forEach(function(exercise) {
        if (id == exercise.id)
          e = {'index' : i, "type" : exercise.Type}

        i++;
      });

      i = -1;

      this.exercises_aerobic.forEach(function(exercise) {
        if (id == exercise.id)
          e = {'index' : i, "type" : exercise.Type}

        i++;
      });

      i = -1;

      this.exercises_gymnastic.forEach(function(exercise) {
        if (id == exercise.id)
          e = {'index' : i, "type" : exercise.Type}

        i++;
      });

      switch (e.type) {
        case "Weight":
          this.exercises_weight.splice(e.index + 1, 1);
          break;
        case "Aerobic":
          this.exercises_aerobic.splice(e.index + 1, 1);
          break;
        case "Gymnastic":
          this.exercises_gymnastic.splice(e.index + 1, 1);
          break;
      }

    }, (err) => {
      console.error(err);
    });
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {

    // get all exercises using an observer and add
    // exercises using push method with the value
    // retrieved of firebase
    this.exerciseData.exercises().subscribe(exercise => {
      this.ngZone.run(() => {

        // control list
        switch (exercise.Type) {
          case "Weight":
            this.exercises_weight.push(exercise);
            break;
          case "Aerobic":
            this.exercises_aerobic.push(exercise);
            break;
          case "Gymnastic":
            this.exercises_gymnastic.push(exercise);
            break;
          default:
            console.log('default');
        }

      });
    });
  }

  /**
    [ngOnDestroy description]
  */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
    [exerciseTapped description]
    When user click over event we need to launch modal view
    to complete action, change pr value or cancel.
    @param {event} event       [which fire]
    @param {exercise} exercise [exercise pressed]
  */
  exerciseTapped(event, exercise) {

    let modal = this.modalCtrl.create(PrPage, { "exercise": exercise });
    modal.present();

    //this.navCtrl.push( PrPage, { "exercise": exercise } );
  }

  /**
    [removeExercise description]
    remove the exercise which selected
    @param {exercise} exercise [exercise pressed]
  */
  removeExercise(exercise) {
    this.exerciseData.removeExercise(exercise.id);
  }

  /**
    [goToAddExercise description]
    go to add exercise page
  */
  goToAddExercise(){
      this.navCtrl.push(AddexercisePage);
  }

  /**
    [ionViewWillEnter description]
    enter in this view every time when the view is loaded
  */
  ionViewWillEnter() { }
}
