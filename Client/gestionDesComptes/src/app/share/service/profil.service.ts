import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil.model';

@Injectable()
export class ProfilService {

  public url: string = "http://localhost:8080/api/profiles/"; 
  public profil: Profil;

  constructor(private http:HttpClient) { }



  editProfil(profil:Profil):Observable<Profil>{
    return this.http.post<Profil>(this.url+"edit",profil);
  }

}
