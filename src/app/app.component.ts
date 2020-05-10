import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/authService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
  title = 'MeanFS';
}
