import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators/tap';

import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { JwtToken } from '../share/models/JwtToken.model';
import { Profil } from '../share/models/profil.model';

@Injectable()
export class AuthentifficationService {

  private url:string = "http://localhost:8080/";
  public jwtToken:BehaviorSubject<JwtToken>= new BehaviorSubject({
    isAuthenticated : null,
    token : null,
    roles : null,
    username : null,
    isAdmin : null
  });

  public profil:BehaviorSubject<Profil>= new BehaviorSubject({
    code: null,
    nom: null,
    email: null,
    username: null,
    password: null,
    dateCreation: null,
    roles: null,
    discriminatorValue: null
  })

  constructor(private http: HttpClient, private router: Router) { }

  login(user){
    //on a ajouté l'option observe: response car on veut pas que spring boot convertie la reponse en format json
    //car login c'est une action de spring security qui retoune par default la reponse en format json
    return this.http.post<string>(this.url+"login",user, { observe:'response'});
  }

  getProfil(username){
    return this.http.get<Profil>(this.url+"api/profiles/username/"+ username);
  }

  saveToken(tk:string){
    localStorage.setItem('token', tk);
    let jwtHelper = new JwtHelper();
    //on décode le token avec la méthode decodeToken de l'objet JwtHelper et on récupère le contenu des claims
    let roles = jwtHelper.decodeToken(tk).roles;
    let username = jwtHelper.decodeToken(tk).sub;
    this.jwtToken.next({
      isAuthenticated : true,
      token : tk,
      roles : roles,
      username : username,
      isAdmin : this.isAdmin(roles)
    });
    this.http.get<Profil>(this.url+"api/profiles/username/"+ username).subscribe(
      res => {
        this.profil.next({
          code: res.code,
          nom: res.nom,
          email: res.email,
          username: res.username,
          password: null,
          dateCreation: res.dateCreation,
          roles: res.roles,
          discriminatorValue : res.discriminatorValue
        });
      }
    )

  }

logout(){
  this.jwtToken.next({
    isAuthenticated : false,
    token : null,
    roles : null,
    username : null,
    isAdmin : null
  });
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

  isAdmin(roles):boolean{
    for(let r of roles){
      if(r.authority=='ADMIN') return true;
    }
    return false;
  }
}
