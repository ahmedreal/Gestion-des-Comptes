import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profil } from '../share/models/profil.model';
import { AuthentifficationService } from '../share/service/authentiffication.service';
import { ProfilService } from '../share/service/profil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {

  public profil: Profil; 
  public sub: Subscription
  constructor(private auth: AuthentifficationService, private profilService:ProfilService) { }

  ngOnInit() {
    this.auth.profil.subscribe(res =>{
      this.profil = res;
    });
   }

  ngOnDestroy(){
  }

}
