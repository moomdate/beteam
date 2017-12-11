import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,public firebase:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.firebase.auth.onAuthStateChanged(user => {
      // var key__;
       if (!user) {
         this.navCtrl.setRoot(LoginPage);
        console.log(user.uid);
       }
      
     });
  }
  logout(){
    this.firebase.auth.signOut().then(ar=>{
     // this.navCtrl.setRoot(LoginPage);
    });
    console.log("Logouted")
  }

}
