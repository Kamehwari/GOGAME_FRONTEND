import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationRoutes } from './registration.routing';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'; 


@NgModule({
  imports: [CommonModule, RegistrationRoutes, ReactiveFormsModule, FormsModule, MatCardModule,MatToolbarModule ],
  declarations: [],
  providers: []
})
export class RegistrationsModule {}
