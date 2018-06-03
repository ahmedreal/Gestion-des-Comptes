import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthentifficationService } from '../../share/service/authentiffication.service';
import { Profil } from '../../share/models/profil.model';
import { ProfilService } from '../../share/service/profil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  public editForm: FormGroup;
  public profil:Profil;
  constructor(private fb:FormBuilder, private router:Router, private auth: AuthentifficationService, private profilService:ProfilService) { }

  ngOnInit() {
    this.auth.profil.subscribe(res =>{
      this.profil = res;
    });
    this.editForm = this.fb.group({
      code:this.profil.code,
      nom : this.profil.nom,
      email:[this.profil.email, Validators.required],
      username :this.profil.username,
      password :[this.profil.password, Validators.required],
      dateCreation : this.profil.dateCreation
    });
  }

  editProfil(){
    this.profil.password = this.editForm.value.password;
    this.profil.email = this.editForm.value.email;
    this.profilService.editProfil(this.profil).subscribe( resp =>{  
        this.router.navigate(["../"]);
      })
  }

}
