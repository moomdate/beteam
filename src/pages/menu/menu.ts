import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { SettingsPage } from '../../pages/settings/settings';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';

/**
 * Generated class for the MenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  homeRoot = HomePage;
  setting = SettingsPage;
  /*  logoutRoot = 'LogoutPage'
  
  */
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      // var key__;
       if (!user) {
         this.navCtrl.setRoot(LoginPage);
       }
     });

  }

}
