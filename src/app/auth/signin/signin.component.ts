import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../authService.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl : './signin.component.html',
    styleUrls : ['./signin.component.css']
})

export class SignInComponent implements OnInit,OnDestroy{

    isLoading = false;
    email:string;
    password:string;
    private authSub:Subscription;

    constructor(private authService:AuthService){}

    ngOnInit(): void {
        this.authSub = this.authService.getAuthStatusListener().subscribe(
            () => this.isLoading = false
        )
    }

   
    ngOnDestroy() {
        this.authSub.unsubscribe()
    }

    onLogin(formData:NgForm){
        if(formData.invalid){return}
        this.isLoading = true;
        this.authService.loginUser(formData.value.email,formData.value.password)
                      
    }

}