import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostServiceService } from 'src/app/post-service.service';
import { Post } from '../Post.model';
import {Subscription} from 'rxjs'
import { from } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/authService.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  postList:Post[]=[];
  private postSub:Subscription;
  authListenerSub:Subscription;
  userId:string;
  isLoading:boolean = false;
  totalPost = 0;
  pageSize = 2;
  pageIndex = 1;
  pageSizeOptions: number[] = [2,4,6,8];
  isUserAuthenticated:boolean;
  
  constructor(private postServiceService:PostServiceService,private authService:AuthService) { }

  ngOnInit() {
    this.isLoading = true
    this.userId = this.authService.getUserId();
    this.postServiceService.getPost(this.pageSize,this.pageIndex);
     this.postSub = this.postServiceService.getUpdatedPostListener().subscribe(
      (postData:{post : Post[],postCount : number}) => {
        this.isLoading = false
        this.postList = postData.post;
        this.totalPost = postData.postCount
      }
    )
    this.isUserAuthenticated = this.authService.isUserAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(
      result => {
        this.userId = this.authService.getUserId()
        this.isUserAuthenticated = result;
      }
    );
    console.log(this.isUserAuthenticated)
  }

  onDelete(id:string){
    this.isLoading = true
    this.postServiceService.deletePost(id).
      subscribe(() => this.postServiceService.getPost(this.pageSize,this.pageIndex),() => this.isLoading = false)
  }

  onPageChange(pageData:PageEvent){
    this.isLoading=true
    this.pageSize = pageData.pageSize;
    this.pageIndex = pageData.pageIndex+1
    this.postServiceService.getPost(this.pageSize,this.pageIndex);
    this.isLoading=false
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  isAllowed(postId){
    //console.log(this.userId+" "+postId)
    if(this.userId === postId){
      return true
    }
    return false
  }
}
