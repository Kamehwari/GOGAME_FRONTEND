import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutes } from './user.routing';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'; 


@NgModule({
  imports: [CommonModule, UserRoutes, ReactiveFormsModule, FormsModule, MatCardModule,MatToolbarModule ],
  declarations: [],
  providers: []
})
export class UsersModule {}
