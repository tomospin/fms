import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Products {
 
  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getProducts(user){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      
      this.http.post('http://' + location.hostname + ':8080/api/products/show', JSON.stringify(user), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }
 
  createProduct(product){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      
      this.http.post('http://' + location.hostname + ':8080/api/products/create', JSON.stringify(product), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  deleteProduct(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('http://' + location.hostname + ':8080/api/products/delete/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
 
    });
 
  }
 
}