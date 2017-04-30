import { JwtHelper } from 'angular2-jwt';

import { Component } from "@angular/core";

import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { Products } from '../../providers/products';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

import { MapPage } from '../map-page/map-page';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  products: any;
  loading: any;

  user: any;
  owner: boolean;

  constructor(public navCtrl: NavController, public productService: Products, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  ionViewDidLoad(){

      let jwtHelper = new JwtHelper();
      this.user = jwtHelper.decodeToken(this.authService.token)
      if (this.user.role == "owner") {
        this.owner = true;
      } else {
        this.owner = false;
      }
      this.productService.getProducts(this.user).then((data) => {
          this.products = data;
      }, (err) => {
        console.log("not allowed");
    });
 
  }
 
  addProduct(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add Product',
      inputs: [
        { name: 'name', placeholder: 'Product name'},
        { name: 'description', placeholder: 'Product description'},
        { name: 'quantity', placeholder: 'Product quantity'},
        { name: 'price', placeholder: 'Product price'}
      ],
      buttons: [
        { text: 'Cancel'},
        { text: 'Save',
          handler: product => {
            if(product.name == "" || product.price == "" || product.quantity == ""){
              this.showErrorAlert("Some of the product info\'s missing, Please try again");

            } else if (isNaN(Number(product.price)) || isNaN(Number(product.quantity))) {
              this.showErrorAlert("Price and Quantity must be number");

            } else {
              product.company =  this.user.company
              this.showLoader();

              this.productService.createProduct(product).then((result) => {
                  this.loading.dismiss();
                  this.products = result;
                  console.log("product created");
                }, (err) => {
                  this.showErrorAlert("You are not allowed to add product");
                  this.loading.dismiss();
                  console.log("not allowed");
                });
            } // end else
          } // end handler
        } // end save
      ] // end buttons
    }); // end promt
 
    prompt.present();
 
  } // end addProduct
 
  deleteProduct(product){
    
    this.showLoader();
 
    //Remove from database
    this.productService.deleteProduct(product._id).then((result) => {
 
      this.loading.dismiss();
 
      //Remove locally
        let index = this.products.indexOf(product);
 
        if(index > -1){
            this.products.splice(index, 1);
        }   
 
    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  showErrorAlert(errorMessage) {
    let errAlert = this.alertCtrl.create({
      title: 'Error',
      subTitle: errorMessage,
      buttons: ['Dismiss']
    });
    errAlert.present();  
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
 
  }

  showMapPage() {
    this.navCtrl.push(MapPage);
}

 
}