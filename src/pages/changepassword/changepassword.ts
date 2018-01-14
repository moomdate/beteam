import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  Email: string = "moom"
  CurrentPass: string;
  NewPass: string;
  ConfirmNewPass: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,

  ) {
    var user = afAuth.auth.currentUser;

    this.Email = user.email;
    // console.log(data.email);
  }
  UserException(message) {
    message;
  }
  presentAlert(str: string, ms: string) {
    let alert = this.alertCtrl.create({
      title: str,
      subTitle: ms,
      buttons: ['OK']
    });
    alert.present();
  }
  ChangPass() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    try {
      loading.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.Email, this.CurrentPass).then(ok => {
        var newPassword = this.NewPass;
        var confirmPass = this.ConfirmNewPass;
        if (this.NewPass != this.ConfirmNewPass) {
          throw "your password is not match"
        }
        // Handle Errors here.
        var errorCode = ok.code;
        var errorMessage = ok.message;
        console.log("sinin success");
        var user = this.afAuth.auth.currentUser;
        user.updatePassword(newPassword).then(data => {
          this.presentAlert("Success!!", "Password Change Complete!");
          this.navCtrl.pop();
          console.log("change password sucess")
        }).catch(function (error) {
          this.presentAlert("Error!!", error);
          console.log("error to change", error)
        });
        setTimeout(() => {
          loading.dismiss();
        }, 200);
        // ...
      }).catch(data => {
        setTimeout(() => {
          loading.dismiss();
        }, 200);
        if (data.message)
          this.presentAlert("Error!!", data.message);
        else
          this.presentAlert("Error!!", data);
        console.log("error login", data);
      });

    } catch (ex) {
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
      this.presentAlert("Error!!", ex.message);
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
