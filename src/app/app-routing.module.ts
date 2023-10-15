import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'add',
        component: CreateUserPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
