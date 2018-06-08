import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtToken } from '../models/JwtToken.model';
import { map } from 'rxjs/operators';
import { AuthentifficationService } from '../../login/authentiffication.service';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(private auth:AuthentifficationService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.jwtToken.pipe(
        map((jwtToken:JwtToken)=> {
          if(jwtToken.isAdmin){
            return true;
          }else{
            this.router.navigate(['/login']);
            return false;
          }      
        })
      );
  }
}
