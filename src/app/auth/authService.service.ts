import { Injectable } from '@angular/core';
import { User } from './user.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.APIUrl + '/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token:string;
    private authStatusListener = new Subject<boolean>()
    private isAuthenticated = false;
    private timer:any;
    private userId:string;
    constructor(private http: HttpClient,private router:Router) { }
    public createUser(email: string, password: string) {
        const userData: User = { email, password }
        return this.http.post(BACKEND_URL + "/signUp", userData)
    }

    public loginUser(email: string, password: string) {
        const authData: User = { email, password }
        return this.http.post<{ token: string, expiresIn : number,userId:string}>(BACKEND_URL + "/login", authData)
            .subscribe(response => {
                console.log("success")
                this.setToken(response.token);
                if(this.token){
                    console.log(response.expiresIn)
                    const expiresIn = response.expiresIn;
                    this.userId = response.userId;
                    this.setAuthTimer(expiresIn)
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + expiresIn*1000);
                    this.saveDataToLocalStorage(this.token,expirationDate,this.userId)
                    this.authStatusListener.next(true)
                    this.isAuthenticated = true;
                    this.router.navigate(['/']);
                }
            },error => {
               // console.log(error)
                this.authStatusListener.next(false)
            })
    }

    autoAuthUser(){
        const authInfo = this.getAuthData();
        if(!authInfo){
            return;
        }
        const now = new Date();
        const isInFuture = authInfo.expiresIn.getTime() - now.getTime();
        if(isInFuture>0){
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.userId = authInfo.userId;
            this.setAuthTimer(isInFuture/1000) //authTimer use seconds therefore converting milliseconds to second
            this.authStatusListener.next(true)
        }
    }

    private getAuthData(){
        const token = localStorage.getItem('token')
        const expiresIn = localStorage.getItem('expiration')
        const userId = localStorage.getItem('userId')

        if(!token || !expiresIn){
            return;
        }
        return {
            token:token,
            expiresIn: new Date(expiresIn),
            userId : userId
        }
    }

    private setAuthTimer(expiresIn:number){
        this.timer = setTimeout(() => {
            this.onLogOut()
        },expiresIn*3600)
    }

    public onLogOut(){
        this.token = null;
        this.isAuthenticated = false;
        this.userId = null;
        this.authStatusListener.next(false);
        clearTimeout(this.timer)
        this.clearDataFromLocalStorage()
        this.router.navigate(['/']);
    }

    private saveDataToLocalStorage(token:string,expirationTime:Date,userId:string){
        localStorage.setItem('token',token)
        localStorage.setItem('expiration',expirationTime.toISOString())
        localStorage.setItem('userId',userId)
    }

    private clearDataFromLocalStorage(){
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        localStorage.removeItem('userId')
    }

    public getToken() {
        return this.token;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getAuthStatusListener(){
        return this.authStatusListener;
    }

    public setAuthStatusListener(val:boolean){
        this.authStatusListener.next(val);
    }

    public isUserAuth(){
        return this.isAuthenticated;
    }

    public getUserId(){
        return this.userId;
    }

}