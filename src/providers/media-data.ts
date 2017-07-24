import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Camera } from '@ionic-native/camera';
import { Crop } from 'ionic-native'

/*
  Class for the Media provider.
*/
@Injectable()
export class MediaData {

  /**/
  constructor(
    public http: Http,
    public platform: Platform,
    public camera: Camera,
    public crop: Crop) { }

  /**
   [toDataUrlBase64 description]
   convert image using uri to image using
   base64 format
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
    [getMedia description]
    Return a promise to catch errors while loading image
  */
  getMedia(source: number): Promise<any> {

    let options: any = {
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: source,
      correctOrientation: true,
      mediaType: this.camera.MediaType.ALLMEDIA,
      destinationType: this.camera.DestinationType.FILE_URI
    }

    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options).then((fileUri) => {

      // Crop Image, on android this returns something like,
      // '/storage/emulated/0/Android/...' Only giving an android
      // example as ionic-native camera has built in cropping ability
      if (this.platform.is('ios')) {
        return fileUri
      } else if (this.platform.is('android')) {

        // Modify fileUri format, may not always be necessary
        fileUri = 'file://' + fileUri;

        // Crop image using cordova crop plugin
        return Crop.crop(fileUri, { quality: 100 });
      }
    })
    .then((path) => {
      return path;
    })
  }
}
