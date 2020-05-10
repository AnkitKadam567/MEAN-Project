import { NgModule } from '@angular/core';
import { SignInComponent } from '../auth/signin/signin.component';
import { SignUpComponent } from '../auth/signup/signup.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../routing/auth-routing.module';

@NgModule({
    declarations : [
        SignInComponent,
        SignUpComponent,
    ],

    imports : [
        CommonModule,
        AuthRoutingModule,
        AngularMaterialModule,
        FormsModule
    ]
})
export class AuthModule{}