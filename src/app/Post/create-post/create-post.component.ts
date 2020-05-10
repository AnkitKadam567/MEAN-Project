import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostServiceService } from 'src/app/post-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Post.model';
import { mimeType } from '../create-post/mime-type.validator'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  
  mode:string="add"
  postDesc:string=" "
  postTitle:string =" "
  isLoading:boolean = false;
  imagePreview:string|ArrayBuffer;
  form:FormGroup;
  postId:string;
  
  constructor(private postServiceService: PostServiceService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      'title' : new FormControl(null,{validators:[Validators.required]}),
      'description' : new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'image' : new FormControl(null,{validators: [Validators.required],asyncValidators: [mimeType]})
    })

    this.route.paramMap.subscribe(
      (params) => {
        if(params.has('postId')){
          this.mode = "edit"
          this.postId = params.get("postId");
          this.isLoading =true;
          this.postServiceService.getPostById(this.postId).subscribe(data => { 
            
            this.isLoading = false
            this.form.setValue({
              title:data.post.title,
              description:data.post.description,
              image:data.post.imagePath
            })
            console.log("Some error occured 1")
          }, () => {
            this.isLoading = false
            console.log("Some error occured")
          })
        }
        console.log("Some error occured 2")
      },() =>  {
        this.isLoading = false
        console.log("Some error occured")
      }
    )
  }

  onAddPost() {
    this.isLoading = true
    if (this.form.invalid) {
      this.isLoading = false
      return;
    }
  //  console.log(this.form.value.image)
    if(this.mode === 'add'){
      this.postServiceService.addPost(this.form.value.title,this.form.value.description,this.form.value.image)
        .subscribe(
        (result) => {
          this.router.navigate(["/"])
        },(error) => this.isLoading = false
      );
    }
    else{
      let editablepost:{id:string,title:string,description:string,image:File|string}=null;
      console.log(this.form.value.image)
      this.postServiceService.updatePost(this.postId,this.form.value.title,this.form.value.description,this.form.value.image)
      .subscribe(
        (message)=>{
          this.router.navigate(["/"])
        },(error) => {this.isLoading =  false;this.router.navigate(["/"])}
      )
    }
    this.form.reset();
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image : file})
    this.form.get('image').updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result ;
    }
    reader.onloadend = () => {
    //  console.log(this.form)
    }
    reader.readAsDataURL(file);
  }

  onReset(){
   this.imagePreview = ''
    this.form.reset();
  }
}
