
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MediaData } from '../providers/media-data';
import firebase from 'firebase';

// Cordova
declare var cordova: any;

@Injectable()
export class StorageData {
  storageRef: any;

  /**
   * 
   * @param http 
   * @param mediaData 
   */
  constructor(public http: Http, public mediaData: MediaData) {
    this.storageRef = firebase.storage().ref();
  }

  /**
   [upload description]
   upload imagen in firebase storage and get url file
   @param {string} imageSource [image to upload]
   @param {string} username    [username of the user]
   */
  upload(imageSource: string, username: string){

    // create a reference to 'profile/username.jpg'
    const imageRef = this.storageRef.child('profile/' + username.toLocaleLowerCase() + '.png');

    // convert image uri to base 64
    this.mediaData.toDataUrlBase64(imageSource, function (imageBase64) {
      imageRef.putString(imageBase64, firebase.storage.StringFormat.DATA_URL).then( (snapshot) => {
        console.log('the picture has been uploaded');
      });
    });
  }

  /**
   * download image and save in local storage
   * return the entry url
   * @param imageFirebaseUrl 
   */
  download(imageFirebaseUrl: string, id: string){
    const fileTransfer = new Transfer();
    
    return fileTransfer.download(imageFirebaseUrl, cordova.file.dataDirectory + id + '.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      return entry.toURL();
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * [toDataUrlBase64 description]
   * convert uri image into base64 format
   * @param url {string} - uri of the image
   * @param callback {callback} - function to return the callback
   */
  toDataUrlBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  /**
    [image description]
    get download url using the image name
    @param  {string} src [image name]
  */
  image( src: string ): Observable<any> {
    return Observable.create(observer => {

      // Get the download URL for 'profiles folder'
      // This can be inserted into an <img> tag
      // This can also be downloaded directly
      this.storageRef.child( 'profile/' + src + '.png' ).getDownloadURL().then(function(url) {
        observer.next(url);
      }).catch(function(error) {
        observer.next(error);
      });

      // Any cleanup logic might go here
      return () => console.log('disposed')
    });
  }
}
