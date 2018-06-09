import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profil } from '../../share/models/profil.model';
import { Router } from '@angular/router';
import { SharedService } from '../../share/service/shared.service';
import { ProfilService } from '../profil.service';
import { AuthentifficationService } from '../../login/authentiffication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit, OnDestroy {

  public editForm: FormGroup;
  public profil:Profil;
  public erreur:string;
  public sub1:Subscription;
  public sub2:Subscription;

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthentifficationService, private sharedService:SharedService, private profilService:ProfilService) { }

  ngOnInit() {
    this.sub1 = this.auth.profil.subscribe(res =>{
      this.profil = res;
    });

    this.editForm = this.fb.group({
      nom : this.profil.nom,
      email:[this.profil.email, Validators.required],
      username :this.profil.username,
      password :['', Validators.required],
      passwordConf:['',Validators.required],
      dateCreation : this.profil.dateCreation
    });
  }

  confirmPassword(){
    this.erreur = this.sharedService.isPasswordConfirmed(this.editForm.get('password').value, this.editForm.get('passwordConf').value);
  }

  canEdit():boolean{
    if(this.editForm.valid && !this.erreur){
      return true
    }else{
      return false
    }
  }

  editProfil(){
    this.profil.email = this.editForm.get('email').value;
    this.profil.password = this.editForm.get('password').value;

    this.sub2 = this.profilService.editProfil(this.profil).subscribe( (profil:Profil) =>{  
      this.router.navigate(['/profil'], {queryParams:{'isEdit':'true'}});
      });

    this.editForm.reset();
  }

  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe;
    if(this.sub2)
      this.sub2.unsubscribe;
  }

}
