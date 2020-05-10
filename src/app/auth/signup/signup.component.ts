import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { User } from '../user.module';
import { AuthService } from '../authService.service';
import { Router } from '@angular/router';

@Component({
    templateUrl : './signup.component.html',
    styleUrls : ['./signup.component.css']
})


export class SignUpComponent{
    isLoading = false;
    email:string;
    password:string;
    constructor(private authService:AuthService,private router:Router){}
    onSignUp(formData:NgForm){
        if(formData.invalid){return}
        this.isLoading = true;
        this.authService.createUser(formData.value.email,formData.value.password)
                        .subscribe(() => {
                            this.isLoading = false;
                            this.router.navigate(['/auth/signin']);
                        },error => {
                            this.isLoading = false
                            formData.reset()
                        })
    }

}