import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { MenuPage } from '../menu/menu';

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
  fullname: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController

  ) {
  }
  presentAlert(str: string, ms: string) {
    let alert = this.alertCtrl.create({
      title: str,
      subTitle: ms,
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    console.log("register");
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    try {
      loading.present();
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(ok => {
        console.log(ok.uid);

        var user = ok;

        user.updateProfile({
          displayName: this.fullname,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(data => {
          console.log("update profile success");
          this.navCtrl.setRoot(MenuPage);
        }).catch(error => {
          this.presentAlert("error", error.message)
          console.log("error while update");
        });
        setTimeout(() => {
          loading.dismiss();
        }, 1000);

      }).catch(error => {
        this.presentAlert("error", "please check your register field!!")
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      })
    } catch (ex) {
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
      this.presentAlert("error", ex.message)
    }
  }
}
