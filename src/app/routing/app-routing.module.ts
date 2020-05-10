import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from '../Post/post-list/post-list.component';
import { CreatePostComponent } from '../Post/create-post/create-post.component';
import { AuthGuard } from '../auth/auth.guard';
import { PageNotFoungComponent } from '../page-not-foung/page-not-foung.component';

const routes: Routes = [
  { path:'',component : PostListComponent},
  { path:'create',component: CreatePostComponent,canActivate : [AuthGuard]},
  { path:'edit/:postId', component: CreatePostComponent,canActivate : [AuthGuard]},
  { path:'auth', loadChildren : () => import('../modules/auth.module').then(module => module.AuthModule) }, //"../modules/auth.module#AuthModule"
  { path:'**', component: PageNotFoungComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
