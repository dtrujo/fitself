import { TabsPage } from './../tabs/tabs';
import { Config } from './../../models/config';
import { TrainingDetailsPage } from './../training-details/training-details';
import { User } from './../../models/user';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { DashBoardPage } from '../dashboard/dashboard';
import { BoxesPage } from '../boxes/boxes';
import { AuthData } from '../../providers/auth-data';

/**
  Generated class for the SignupPage page.
*/
@Component({
  selector: 'page-signup-2',
  templateUrl: 'signup2.html'
})
export class Signup2Page {
  signup2Form: any;
  user: User;
  box_name: any;
  config: Config;

  unistWeightValue: number;
  unistTallValue: number;
  translateUnitsWeightValue: number;
  
  unitsWeightType: string;
  unitsTallType: string; 
  translateUnitsWeightType: string; 

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public authData: AuthData,
               public ngZone: NgZone,
               public storage: Storage,
               public navParams: NavParams,
               public modalCtrl: ModalController,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {

    // get user
    this.user = navParams.get('user');

    // create config model to save data in local storage
    this.config = new Config(0,0,0, 'assets/images/crossfitindependent_w.png','');

    // set default independent box
    this.box_name = 'Independent';
    this.user.box = null;

    // set default unit to weight and translate value
    this.unitsWeightType = "Kg";
    this.unitsTallType = "Cm";
    this.translateUnitsWeightType = "Lb";
    this.translateUnitsWeightValue = 0;

    // validate form
    this.signup2Form = formBuilder.group({
      city: ['', Validators.required],
      tall: ['', Validators.required],
      weight: ['', Validators.required]
    })
  }

  /**
   [updateUnits description]
   Change units depending if the internationalc
   value is checked or not. Change Kg or Lb
   */
  updateUnits(){
    var weight;

    // Kg units
    if(this.user.international == false){
      this.unitsWeightType = "Lb";
      this.translateUnitsWeightType = "Kg";
      if (this.signup2Form.value.weight){
        this.translateUnitsWeightValue = this.signup2Form.value.weight;
        weight = (this.signup2Form.value.weight * 2.20).toFixed(2);
      }
    
    // Lb units
  } else {
      this.unitsWeightType = "Kg";
      this.translateUnitsWeightType = "Lb";
      if (this.signup2Form.value.weight) {
        this.translateUnitsWeightValue = this.signup2Form.value.weight;
        weight = (this.signup2Form.value.weight / 2.20).toFixed(2);
      }
    }
    this.signup2Form.controls[ 'weight' ].setValue(weight);
  }

  /**
    [showBoxes description]
    show all boxes to select the official box
   */
   showBoxes(){
    
    // create modal
    let boxesModal = this.modalCtrl.create(BoxesPage);
    
    // callback when user close modal
    boxesModal.onDidDismiss(data => {
      this.config.imageBoxW = data.box.id != null ? data.box.image_w : "assets/images/crossfitindependent_w.png";
      this.config.imageBoxB = data.box.id != null ? data.box.image_b : "assets/images/crossfitindependent_b.png";

      this.box_name = data.box.box;
      this.user.box = data.box.id;
    });
    
    // present modal boxes
    boxesModal.present();
  }

  /**
    [signupUser description]
    this is the last step to signup user
    we check if the form is valid, update user model
    and signup user using provider.
  */
  signup2User(){

    if (!this.signup2Form.valid){
      console.log(this.signup2Form.value);
    } else {

      // complete user model
      this.user.city =  this.signup2Form.value.city;
      this.user.tall =  this.signup2Form.value.tall;
      this.user.weight =  this.signup2Form.value.weight;

      // call service to signup the new user
      this.authData.signupUser( this.user ).then(() => {

        // clear all storage
        this.storage.clear();
        
        // save new user and new config to 
        // local storage and some variables
        this.storage.set('user', JSON.stringify(this.user));     
        this.storage.set('config', JSON.stringify(this.config));        

        this.navCtrl.setRoot(DashBoardPage);
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

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

      loading.present();
    }
  }
}
