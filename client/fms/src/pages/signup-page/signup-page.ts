import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  fullname: string;
  company: string;
  address: string;
  loading: any;
 
  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
 
  }
 
  register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        company: this.company,
        role: this.role,
        address: this.address
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        let errAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: JSON.parse(err._body).error,
            buttons: ['Dismiss']
        });
        errAlert.present();
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}