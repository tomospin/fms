
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Products } from '../providers/products';
import { Auth } from '../providers/auth';

import { MapPage } from '../pages/map-page/map-page';
import { ChatPage } from '../pages/chat-page/chat-page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MapPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsPlacement:'bottom'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MapPage,
    ChatPage
  ],
  providers: [Products, Auth]
})
export class AppModule {}