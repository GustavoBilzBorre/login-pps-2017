import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { User } from '../../app/modules/user';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user: User = new User();
  public mensaje: string = '';

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
      .then((e)=>{
        this.mensaje='';
        this.navCtrl.push('HomePage');
      })
      .catch((e)=>{
        console.log(e.message);
        switch(e.message){
          case 'The email address is badly formatted.':
            this.mensaje='El mail no tiene el formato correcto.';
            break;
          case 'The password is invalid or the user does not have a password.':
            this.mensaje='La contraseña no es correcta.';
            break;
          case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            this.mensaje='El usuario no es correcto.';
            break;
        }
      });
  }
}
