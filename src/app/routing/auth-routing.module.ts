import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../auth/signup/signup.component';
import { SignInComponent } from '../auth/signin/signin.component';

const routes:Routes = [
    { path:'signin',component : SignInComponent},
    { path:'signup',component : SignUpComponent}
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class AuthRoutingModule{}