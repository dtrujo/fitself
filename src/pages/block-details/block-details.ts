import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-block-details',
  templateUrl: 'block-details.html'
})
export class BlockDetailsPage {

  blockDetails : any;

  /**
  */
  constructor(public navCtrl: NavController) {

    // session details
    this.blockDetails = {

      Title : 'Title of the session',
      Description : 'Description of the session',
      Blocks : [ {
        Name : 'Warm Up',
        Parts : [{
          Description : '3x <br/> 10 Wall Ball <br/> 15 Sit Ups <br/> 20 Kbs',
          Type : '',
          Mark : '',
          HaveMarl : true
        }]
      },
      {
        Name : 'Strenght',
        Parts : [ {
          Description : '5x5 <br/> Back Squat @80%',
          Type : 'Weight',
          Mark : '130 Kg',
          HaveMark : true
        },
        {
          Description : '30 Squat Clean @60% Touch & Go',
          Type : 'Time',
          Mark : '10',
          HaveMark : false
        }]
      },
      {
        Name : 'Wod',
        Parts : [ {
          Description : '5x <br/> 500m Row <br/> 10 Power Clean 60Kg <br/> 50 Dbs',
          Type : 'Time',
          Mark : '16',
          HaveMarl : true
        }]
      } ]
    }
  }
}
