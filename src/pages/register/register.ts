import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string;
  pass: string;
  fullname:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    console.log("register");
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(ok => {
      console.log(ok.uid);

      var user = ok;

      user.updateProfile({
        displayName: this.fullname,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function () {
        console.log("update profile success");
      }).catch(function (error) {
        console.log("error while update");
      });


    }).catch(error => {
      console.log("error");
    })
  }
}
