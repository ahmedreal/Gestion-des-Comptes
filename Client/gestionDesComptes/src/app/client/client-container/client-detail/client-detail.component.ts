import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../share/models/client.model';
import { Router } from '@angular/router';
import { Compte } from '../../../share/models/compte.model';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit, OnDestroy
 {

public code:number;
public client:Client;
public newCompte:string = '';
public erreur:string;
public isErreur:boolean= false;
public p:Page;
public sub1:Subscription;
public sub2:Subscription;



  constructor(private clientService:ClientService, private router: Router) { }

  ngOnInit() {
    this.sub1 = this.clientService.client.subscribe((client:Client) => {
      this.client = client;
    });
  }

  ajouterCompte(){
   this.sub2 = this.clientService.isCompteExists(this.newCompte).subscribe(()=>{
    this.erreur = 'Le numéro de Compte existe déjà. Merci de renseigner un nouveau code';
    this.isErreur = true;
   },()=>{
    this.clientService.addCompte(this.client, this.newCompte);
    this.newCompte = '';
    this.isErreur = false;
   });  
  }

  detailsCompte(compte:Compte){
    this.router.navigate(['/compte',compte.codeCompte]);
  }

  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe;
    if(this.sub2)
      this.sub2.unsubscribe;
  }
}
