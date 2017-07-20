import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

/*
* Pages
*/

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { ContactPage } from '../pages/contact/contact';
import { FriendsPage } from '../pages/friends/friends';
import { ProfilePage } from '../pages/profile/profile';
import { ExercisesPage } from '../pages/exercises/exercises';
import { SignupPage } from '../pages/signup/signup';
import { Signup2Page } from '../pages/signup2/signup2';
import { ResetPasswordPage } from '../pages/resetpassword/resetpassword';
import { PrPage } from '../pages/pr/pr';
import { AddexercisePage } from '../pages/addexercise/addexercise';
import { FriendDetails } from '../pages/friend-details/friend-details';
import { NotebookPage } from '../pages/notebook/notebook';
import { TrainingDetailsPage } from '../pages/training-details/training-details';
import { SessionDetailsPage } from '../pages/session-details/session-details';
import { BlockDetailsPage } from '../pages/block-details/block-details';
import { AddTrainingPage } from '../pages/add-training/add-training';
import { AddSessionPage } from '../pages/add-session/add-session';
import { AddBlockPage } from '../pages/add-block/add-block';
import { AddPartPage } from '../pages/add-part/add-part';
import { DashBoardPage } from '../pages/dashboard/dashboard';
import { PopoverPage } from '../pages/popover-page/popover-page';
import { BoxesPage } from '../pages/boxes/boxes';

/*
* Providers
*/

import { ConnectionData } from '../providers/connection-data';
import { AuthData } from '../providers/auth-data';
import { ExerciseData } from '../providers/exercise-data';
import { StorageData } from '../providers/storage-data';
import { FriendsData } from '../providers/friends-data';
import { TrainingData } from '../providers/training-data';
import { SessionData } from '../providers/session-data';
import { BlockData } from '../providers/block-data';
import { PartData } from '../providers/part-data';
import { MediaData } from '../providers/media-data';
import { BoxesData } from '../providers/boxes-data';

/*
* Pipes
*/

import { ObjectToArray } from '../pipes/objectToArray';

/*
* Plugins
*/

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { Crop } from 'ionic-native';
import { File } from '@ionic-native/file';


/*
* Modules
*/

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    FriendsPage,
    HomePage,
    LoginPage,
    SettingsPage,
    ProfilePage,
    TabsPage,
    ExercisesPage,
    SignupPage,
    Signup2Page,
    ResetPasswordPage,
    PrPage,
    AddexercisePage,
    FriendDetails,
    NotebookPage,
    TrainingDetailsPage,
    SessionDetailsPage,
    BlockDetailsPage,
    AddTrainingPage,
    AddSessionPage,
    AddBlockPage,
    AddSessionPage,
    AddPartPage,
    DashBoardPage,
    ObjectToArray,
    PopoverPage,
    BoxesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    FriendsPage,
    HomePage,
    LoginPage,
    SettingsPage,
    ProfilePage,
    TabsPage,
    ExercisesPage,
    SignupPage,
    Signup2Page,
    ResetPasswordPage,
    PrPage,
    AddexercisePage,
    FriendDetails,
    NotebookPage,
    TrainingDetailsPage,
    SessionDetailsPage,
    BlockDetailsPage,
    AddTrainingPage,
    AddSessionPage,
    AddPartPage,
    DashBoardPage,
    AddBlockPage,
    PopoverPage,
    BoxesPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    ConnectionData,
    AuthData,
    TrainingData,
    SessionData,
    BlockData,
    PartData,
    ExerciseData,
    StorageData,
    FriendsData,
    Transfer,
    File,
    TransferObject,
    Camera,
    Crop,
    MediaData,
    BoxesData
  ]
})
export class AppModule {}
