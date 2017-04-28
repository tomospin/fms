import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Products } from '../../providers/products';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  products: any;
  loading: any;

  constructor(public navCtrl: NavController, public productService: Products, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  ionViewDidLoad(){
    this.productService.getProducts(this.products).then((data) => {
          this.products = data;
    }, (err) => {
        console.log("not allowed");
    });
 
  }
 
  addProduct(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add Product',
      inputs: [
        {
          name: 'name',
          placeholder: 'Product name'
        },
        {
          name: 'description',
          placeholder: 'Product description'
        },
        // {
        //   name: 'image',
        //   placeholder: 'Product image'
        // },
        {
          name: 'company',
          placeholder: 'Product company'
        },
        {
          name: 'quantity',
          placeholder: 'Product quantity'
        },
        {
          name: 'price',
          placeholder: 'Product price'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: product => {
 
                if(product){
 
                    this.showLoader();
 
                    this.productService.createProduct(product).then((result) => {
                        this.loading.dismiss();
                        this.products = result;
                        console.log("product created");
                    }, (err) => {
                        this.loading.dismiss();
                        console.log("not allowed");
                    });
 
                }
 
 
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
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
 
}