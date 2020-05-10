import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/authService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService) { }
  authListenerSub:Subscription;
  isUserAuthenticated:boolean;

  ngOnInit() {
    this.isUserAuthenticated = this.authService.isUserAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(
      result => {
        this.isUserAuthenticated = result;
        console.log("Header "+this.isUserAuthenticated)
      }
    );
  }

  onLogOut(){
    this.authService.onLogOut();
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe()
  }

}
