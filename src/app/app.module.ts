import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { from } from 'rxjs';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PageNotFoungComponent } from './page-not-foung/page-not-foung.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { PostHeaderComponent } from './Post/post-header/post-header.component';
import { PostModule } from './modules/post.module';
import { AuthModule } from './modules/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoungComponent,
    ErrorComponent,
    PostHeaderComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PostModule
  ],

  providers: [{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
              {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true}],

  bootstrap: [AppComponent],

  entryComponents : [ErrorComponent]

})

export class AppModule { }
