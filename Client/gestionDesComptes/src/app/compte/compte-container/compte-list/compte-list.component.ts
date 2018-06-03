import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OperationService } from '../../../share/service/operation.service';
import { Client } from '../../../share/models/client.model';
import { Compte } from '../../../share/models/compte.model';
import { AuthentifficationService } from '../../../share/service/authentiffication.service';
import { JwtToken } from '../../../share/models/JwtToken.model';
import { ProfilService } from '../../../share/service/profil.service';
import { Profil } from '../../../share/models/profil.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css']
})
export class CompteListComponent implements OnInit {

  public profil: Profil;
  public username:string;
  public isAdmin:boolean;
  public comptes:Compte[];
  public getCompteForm: FormGroup;
  constructor(private opService: OperationService, private router:Router, private auth:AuthentifficationService, private fb:FormBuilder) { 
    this.auth.jwtToken.subscribe(res =>{
      this.isAdmin = res.isAdmin;
      this.username = res.username;
    });

  }

  ngOnInit() {
    if(!this.isAdmin){
      this.getClientComptes();
    }

    this.getCompteForm = this.fb.group({
      code:['',Validators.required]
    });
  }

  getClientComptes(){
    this.opService.getClientComptes(this.username).subscribe(comptes => {
      this.comptes=comptes;})
  }

  chercherCompte(){
    this.opService.getCompte(this.getCompteForm.value.code).subscribe(compte => {
      this.router.navigate(['/compte',compte.codeCompte]);
    });
  }


}
