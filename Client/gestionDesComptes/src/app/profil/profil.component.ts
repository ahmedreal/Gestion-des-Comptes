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
  public sub1: Subscription;
  public sub2:Subscription;
  public isEdit:string;
  public message:string;

  constructor(private auth: AuthentifficationService, private profilService:ProfilService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub1 = this.auth.profil.subscribe(res =>{
      this.profil = res;
    });
    this.sub2 = this.activatedRoute.queryParamMap.subscribe(params => { 
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
  if(this.sub1)
    this.sub1.unsubscribe;
  if(this.sub2)
    this.sub2.unsubscribe;
  }

}
