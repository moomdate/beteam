import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName:string;
  mail:string;
  imageLocal = "https://firebasestorage.googleapis.com/v0/b/beteam-88af8.appspot.com/o/userProfile%2Fdefault%2Fuser(1).png?alt=media&token=6da883b7-a4ba-46c6-8ff6-d4ca2a2178c5";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebase:AngularFireAuth
  ) {
    var user = this.firebase.auth.currentUser;
    this.userName = user.displayName;
    this.mail = user.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
