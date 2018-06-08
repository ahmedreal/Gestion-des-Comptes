import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { JwtToken } from '../models/JwtToken.model';
import { AuthentifficationService } from '../../login/authentiffication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public username : string;
  public isAuthenticated: boolean;
  public isAdmin: boolean;
  public subscription: Subscription;
  constructor(private auth:AuthentifficationService) { }

  ngOnInit() {
   this.subscription =  this.auth.jwtToken.subscribe( (jt:JwtToken) => {
      this.username = jt.username;
      this.isAuthenticated = jt.isAuthenticated;
      this.isAdmin = jt.isAdmin;
    });
  }

  logout(){
    this.isAuthenticated = false;
    this.auth.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
