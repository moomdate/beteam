import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';


import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { MenuPage } from '../menu/menu';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email_input: string;
  password_input: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform,
    private alertCtrl: AlertController

  ) {


  }
  presentAlert(str:string,ms:string) {
    let alert = this.alertCtrl.create({
      title: str,
      subTitle: ms,
      buttons: ['OK']
    });
    alert.present();
  }
  test() {
    // console.log(this.email_input);
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
        if (res.operationType == 'signIn') {
          this.navCtrl.setRoot(HomePage);
        }

      });

    }
  }
  Register_Page() {
    //console.log("register");
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.push(RegisterPage);
  }
  signin() {
    // var email = "moomdate99@gmail.com";
    // var pass = "01234563a";
    try {
      this.afAuth.auth.signInWithEmailAndPassword(this.email_input, this.password_input).then(ok => {
        // Handle Errors here.
        var errorCode = ok.code;
        var errorMessage = ok.message;
        console.log("ok");
        this.navCtrl.setRoot(MenuPage);
        // ...
      }).catch(data => {
        console.log("error");
      });
    } catch (ex) {
      if(ex.message.indexOf("email")){
        this.presentAlert("error","email is required field");
        //console.log("password is null")
      }else if(ex.message.indexOf("password")){
        this.presentAlert("error","password is required field");
        //console.log("password is null")
      }
      console.log(ex);
    }


  }
  ionViewDidLoad() {
    //  this.navCtrl.setRoot(HomePage);
    /*firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.navCtrl.push(HomePage);
        console.log("logined");
      } else {
       console.log("error log")
      }
    });*/

    // console.log(user.uid);

    /*
    var user = this.afAuth.auth.onAuthStateChanged(user => {
      // var key__;
      if (!user) {
        // this.navCtrl.setRoot(LoginPage);
        // console.log(user);
      }
      console.log(user);
    });*/
  }

}
