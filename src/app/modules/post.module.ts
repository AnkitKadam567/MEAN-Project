import { NgModule } from '@angular/core';
import { CreatePostComponent } from '../Post/create-post/create-post.component';
import { PostListComponent } from '../Post/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations : [
        CreatePostComponent,
        PostListComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ]
})
export class PostModule{

}