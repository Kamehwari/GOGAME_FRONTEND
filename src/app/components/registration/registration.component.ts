import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiServicesService} from 'src/app/api-services.service'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;

  constructor( private _fb: FormBuilder,
    private router: Router,
    private apiServicesService: ApiServicesService,) { }

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  registration(){
    if(this.registrationForm){
      let registrationObject = {
        "email":this.registrationForm.value.email,
        "password":this.registrationForm.value.password,
        "name":this.registrationForm.value.name,
        "confirmPassword":this.registrationForm.value.confirmPassword
      }
      this.apiServicesService.post("user/signUp",{}, registrationObject ).subscribe(registrationResponse=>{
        if(registrationResponse.code == 200){
          localStorage.setItem('uid', registrationResponse.user._id);
          localStorage.setItem('name', registrationResponse.user.name)
          this.apiServicesService.successToast(registrationResponse.message)
          this.router.navigate(['/games'])
        }else{
          this.apiServicesService.errorToast(registrationResponse.message);
        }
      },err => {
        console.log(err.error.message)
        this.apiServicesService.errorToast(err.error.message);
      })
    }
  }
}
