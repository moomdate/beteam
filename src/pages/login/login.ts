import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { HomePage } from '../../pages/home/home';
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

  ) { 
    var user = firebase.auth().currentUser;
    if(!user){ //ถ้ามีการล็อกอิน //ยังไม่ถูก
      //console.log(user.uid);
      this.navCtrl.setRoot(HomePage);
    }

  }

  test(){
    console.log("test test");
  }
  loginFacebook() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      //this.navCtrl.setRoot(HomePage);
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
        if (res.operationType == 'signIn'){
          this.navCtrl.setRoot(HomePage);
        }
        
      });
        
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
