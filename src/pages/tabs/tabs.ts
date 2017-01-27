import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { FriendsPage } from '../friends/friends';
import { ExercisesPage } from '../exercises/exercises';
import { NotebookPage } from '../notebook/notebook';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = FriendsPage;
    this.tab3Root = ExercisesPage;
    this.tab4Root = NotebookPage;
  }
}
