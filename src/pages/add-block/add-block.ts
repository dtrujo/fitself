import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { SessionDetailsPage } from '../session-details/session-details';
import { BlockData } from '../../providers/block-data';

/*
  class for the add block page.
*/
@Component({
  selector: 'page-add-block',
  templateUrl: 'add-block.html'
})
export class AddBlockPage {

  newBlockForm : any;
  sessionId : any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public blockData: BlockData,
               public alertCtrl: AlertController,
               public formBuilder: FormBuilder,
               public params: NavParams ) {

     this.sessionId = this.params.get("id");

     // validate form
     this.newBlockForm = formBuilder.group({
       title: ['', Validators.required],
       description: ['', Validators.required]
     })

  }

  /**
    [addBlock description]
    call to service for add new block into a session
  */
  addBlock(){
    this.blockData.add(
      this.sessionId,
      this.newBlockForm.value.title,
      this.newBlockForm.value.description).then(() => {
        this.navCtrl.pop( );
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
