import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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

/*
* Providers
*/

import { AuthData } from '../providers/auth-data';
import { ExerciseData } from '../providers/exercise-data';
import { StorageData } from '../providers/storage-data';
import { FriendsData } from '../providers/friends-data';
import { TrainingData } from '../providers/training-data';
import { SessionData } from '../providers/session-data';
import { BlockData } from '../providers/block-data';
import { PartData } from '../providers/part-data';

/*
* Pipes
*/

import { ObjectToArray } from '../pipes/objectToArray';

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
    ObjectToArray
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
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
    AddBlockPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    TrainingData,
    SessionData,
    BlockData,
    PartData,
    ExerciseData,
    StorageData,
    FriendsData
  ]
})
export class AppModule {}
