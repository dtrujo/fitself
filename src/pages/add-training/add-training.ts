import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { NotebookPage } from '../notebook/notebook';
import { TrainingData } from '../../providers/training-data';

/**
  Class for the AddTrainingPage page.
*/
@Component({
  selector: 'page-add-training',
  templateUrl: 'add-training.html'
})
export class AddTrainingPage {

  newTrainingForm : any;

  /**
    [constructor description]
  */
  constructor(public navCtrl: NavController,
              public trainingData: TrainingData,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder) {

    // validate form
    this.newTrainingForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required]
    })
  }

  /**
    [addTraining description]
    call to service for add new training in the database
  */
  addTraining(){
    this.trainingData.add(
      this.newTrainingForm.value.title,
      this.newTrainingForm.value.description,
      this.newTrainingForm.value.date).then(() => {
        this.navCtrl.pop();
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
