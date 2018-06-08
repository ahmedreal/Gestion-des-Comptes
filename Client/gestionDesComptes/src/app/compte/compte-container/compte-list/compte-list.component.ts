import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Client } from '../../../share/models/client.model';
import { Compte } from '../../../share/models/compte.model';
import { JwtToken } from '../../../share/models/JwtToken.model';
import { Profil } from '../../../share/models/profil.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentifficationService } from '../../../login/authentiffication.service';
import { OperationService } from '../../operation.service';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';

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
  public getCompteForm:FormGroup;
  public listCodeComptes:string[];
  public erreur:string;
  public p:Page;

  constructor(private opService: OperationService, private router:Router, private auth:AuthentifficationService, private fb:FormBuilder) { 
    this.auth.jwtToken.subscribe((res:JwtToken) =>{
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

    this.erreur = null;
    this.opService.getListCodeComptes();
    this.opService.listcodeComptes.subscribe(listCodeComptes => this.listCodeComptes = listCodeComptes);
  }

  getClientComptes(){
    this.opService.getClientComptes(this.username).subscribe(comptes => {
      this.comptes=comptes;})
  }

  chercherCompte(){
    let compteValid = this.listCodeComptes.includes(this.getCompteForm.get('code').value);
    if(this.getCompteForm.valid && compteValid){
      this.erreur = null;
      this.opService.getCompte(this.getCompteForm.value.code).subscribe(compte => {
        this.router.navigate(['/compte',compte.codeCompte]);
      });
    }else{
      this.erreur = 'Compte Invalid!';
    }
   
  }


}
