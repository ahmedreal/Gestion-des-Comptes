import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Profil } from '../models/profil.model';
import { AuthentifficationService } from './authentiffication.service';
import { JwtToken } from '../models/JwtToken.model';

@Injectable()
export class ProfilService {

  public jwToken: JwtToken;
  public url: string = "http://localhost:8080/api/profiles/"; 
  public profil: Profil;

  constructor(private http:HttpClient) { }



  editProfil(profil:Profil):Observable<Profil>{
    return this.http.post<Profil>(this.url+"save",profil);
  }

}
