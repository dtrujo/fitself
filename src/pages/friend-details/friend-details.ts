import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-friend-details',
  templateUrl: 'friend-details.html'
})
export class FriendDetails {

  friend : any;
  friendsCount : number = 0;
  exercisesCount : number = 0;


  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public params: NavParams ) {

     // retrived friends params using NavParams
     this.friend = this.params.get("friend");

     // friend count using keys to length
     this.friendsCount = (Object.keys(this.friend.friends).length);
     this.exercisesCount = Object.keys(this.friend.exercises).length;
  }
}
