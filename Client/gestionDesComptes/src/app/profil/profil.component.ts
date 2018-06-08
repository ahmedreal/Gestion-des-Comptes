import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profil } from '../share/models/profil.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfilService } from './profil.service';
import { AuthentifficationService } from '../login/authentiffication.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {

  public profil: Profil; 
  public sub: Subscription;
  public isEdit:string;
  public message:string;

  constructor(private auth: AuthentifficationService, private profilService:ProfilService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.auth.profil.subscribe(res =>{
      this.profil = res;
    });
    this.activatedRoute.queryParamMap.subscribe(params => { 
      this.isEdit = params.get('isEdit')
      if(this.isEdit==='true'){
        this.message = "Profil edité";
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    });
   }

   getUrl(){
     return ['./edit',this.profil];
   }

  ngOnDestroy(){
  }

}
