import { Injectable } from '@angular/core';
import { Post } from './Post/Post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

const BACKEND_URL = environment.APIUrl + '/post';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postList: Post[] = [];
  private postUpdated = new Subject<{post : Post[],postCount : number}>();
  public editablePost: Post = null;

  

  constructor(private http: HttpClient,private router:Router) { }

  addPost(title: string, desc: string, image:File) {
    let postdata = new FormData();
    postdata.append('title',title);
    postdata.append('description',desc);
    postdata.append('image',image,title);

    return this.http.post<{ message: string, post: Post }>(BACKEND_URL + '/addPost', postdata)
      
  }

  getPost(pageSize:number,pageIndex:number) {
    const queryParams = `?pageSize=${pageSize}&pageIndex=${pageIndex}`

    this.http.get<{ message: string, posts: any, postCount:number}>(BACKEND_URL + '/getPost'+queryParams)
      .pipe(
        map(postData => {
          return { post : postData.posts.map(post => {
            return {
              title: post.title,
              description: post.description,
              id: post._id,
              imagePath: post.imagePath,
              creator:post.creator
            }
          }),
          postCount : postData.postCount}
        })
      )
      .subscribe(
        (transformedPosts) => {
          //console.log(transformedPosts)
          this.postList = transformedPosts.post;
          this.postUpdated.next({post : [...this.postList],postCount : transformedPosts.postCount})
        }
      )
  }

  getPostById(postId: string) {
    return this.http.get<{ message: string, post: Post }>(BACKEND_URL + "/getPostById/" + postId)
  }

  updatePost(id:string,title:string,description:string,image:File|string){
    console.log("In update  "+image)
    console.log(typeof(image))
    let formData:Post|FormData;
    if(typeof(image) === "object"){
      formData = new FormData();
      formData.append("id",id)
      formData.append("title",title);
      formData.append("description",description);
      formData.append("image",image,title);
   }
    else{
      formData = {
        id:id,title:title,description:description,imagePath:image,creator:null
      }
    }
    return this.http.put<{message:string}>(BACKEND_URL + "/updatePost",formData)
  }

  deletePost(postId: string) {
   return this.http.delete(BACKEND_URL + "/deletePost/" + postId)
  }

  getUpdatedPostListener() {
    return this.postUpdated.asObservable();
  }
}
