import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-friend-details',
  templateUrl: 'friend-details.html'
})
export class FriendDetails {

  friend : any;
  friendCount : number;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public params: NavParams ) {

     // retrived friends params using NavParams
     this.friend = this.params.get("friend");

     // friend count using keys to length
     this.friendCount = Object.keys(this.friend.friends).length;
  }
}
