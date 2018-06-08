import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Profil } from '../share/models/profil.model';
import { JwtToken } from '../share/models/JwtToken.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentifficationService } from './authentiffication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public mode:number = 0;
  public sub1: Subscription;
  
  constructor(private fb: FormBuilder, private auth:AuthentifficationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['', Validators.required]
    });
  }

  login(){
      this.sub1 = this.auth.login(this.loginForm.value).subscribe(
      resp =>{  this.auth.saveToken(resp.headers.get('Authorization'));
        this.auth.jwtToken.subscribe(jwtToken => {
          if(jwtToken.isAdmin){
            this.router.navigate(['client']);
          }else{
            this.router.navigate(['compte']);
          }
        });
      }, err =>{
        this.mode = 1;
      }
    );
  }

  ngOnDestroy(){
    //this.sub1.unsubscribe();
  }

}