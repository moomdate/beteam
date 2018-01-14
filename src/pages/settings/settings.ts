import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authen: AngularFireAuth
  ) {
  }
  gotoRepass() {
    this.navCtrl.push(ChangepasswordPage);
  }
  gotoProfile(){
    this.navCtrl.push(ProfilePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  signout() {
    this.authen.auth.signOut().then(data => {
      console.log("ok");
      //  this.navCtrl.setRoot(LoginPage);

    }).catch(error => {
      console.log("sign out error");
    })
  }

}
