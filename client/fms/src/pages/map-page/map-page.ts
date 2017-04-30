import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map-page',
  templateUrl: 'map-page.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

logout(){
	this.authService.logout();
	this.navCtrl.setRoot(LoginPage);
}

}
