import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent{

 constructor(@Inject(MAT_DIALOG_DATA)  public data: {message:string}){}
}
