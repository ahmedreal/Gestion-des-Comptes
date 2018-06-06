import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profil } from '../../share/models/profil.model';
import { ProfilService } from '../../share/service/profil.service';
import { Router } from '@angular/router';
import { SharedService } from '../../share/service/shared.service';
import { AuthentifficationService } from '../../share/service/authentiffication.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  public editForm: FormGroup;
  public profil:Profil;
  public erreur:string;

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthentifficationService, private sharedService:SharedService, private profilService:ProfilService) { }

  ngOnInit() {
    this.auth.profil.subscribe(res =>{
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

    this.profilService.editProfil(this.profil).subscribe( (profil:Profil) =>{  
      this.router.navigate(['/profil'], {queryParams:{'isEdit':'true'}});
      });

    this.editForm.reset();
  }

}
