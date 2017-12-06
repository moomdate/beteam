import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform

  ) { }

  test(){
    console.log("test");
  }
  loginFacebook() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
