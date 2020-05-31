import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {ApiServicesService} from 'src/app/api-services.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginForm: any;
  
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private apiServicesService: ApiServicesService,

  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required,],
      password: ['', Validators.required],
    });
  }

  login(){
      if(this.loginForm){
        let loginObject = {
          "email":this.loginForm.value.email,
          "password":this.loginForm.value.password
        }
        this.apiServicesService.put("user/signIn",{}, loginObject ).subscribe(loginResponse=>{
          console.log(loginResponse.code)
            if(loginResponse.code == 200){
              localStorage.setItem('uid', loginResponse.user._id);
              localStorage.setItem('name', loginResponse.name)
              this.apiServicesService.successToast(loginResponse.message)
              this.router.navigate(['/games'])
            }else{
              this.apiServicesService.errorToast(loginResponse.message);
            }
        },err => {
          console.log(err.error.message)
          this.apiServicesService.errorToast(err.error.message);
        })
      }
  }

}
