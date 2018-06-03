import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Compte } from '../models/compte.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Operation } from '../models/operation.model';

@Injectable()
export class OperationService {

  public url: string = "http://localhost:8080/api/"; 
  public comptes: BehaviorSubject<Compte[]> = new BehaviorSubject(null);
  public compte: BehaviorSubject<Compte> = new BehaviorSubject(null);
 
  constructor(private http:HttpClient) { }

  getClientComptes(username:string):Observable<Compte[]>{
    return this.http.get<Compte[]>(this.url+"comptes/clientComptes/"+username);
  }

  getCompteDetail(codeCompte:string){
    this.http.get<Compte>(this.url+"comptes/"+codeCompte).subscribe((compte:Compte)=>{
       this.getOperations(compte.codeCompte).subscribe(operations => {
        this.compte.next({
          codeCompte: compte.codeCompte,
          dateCreation: compte.dateCreation,
          solde: compte.solde,
          client: compte.client,
          operations: operations
        });
      })
    }); 
  }


  getOperations(codeCpt:string):Observable<Operation[]>{
    return this.http.get<Operation[]>(this.url+"operations/byCompte/"+codeCpt);
  }

  getCompte(codeCpt:string):Observable<Compte>{
    return this.http.get<Compte>(this.url+"comptes/"+codeCpt);
  }

  doOperation(dateOperation:Date, montant:number, compteOrig:Compte, codeCompteDist:string, typeOperation:string):string{
    let erreur: string = null;
    let operation = {
      dateOperation:dateOperation,
      montant:montant,
      compte:compteOrig,
      codeCompteTiers: codeCompteDist
    }
  
    if( ((typeOperation==='VIR') || (typeOperation==='RETR')) && (compteOrig.solde < montant)){
      erreur = 'Solde insuffisant';
    }else{
      if(typeOperation==='VERS'){
        this.http.post(this.url+"operations/versement",operation).subscribe();
       }else if(typeOperation==='RETR'){
          this.http.post(this.url+"operations/retrait",operation).subscribe();  
       }else if(typeOperation==='VIR'){
        this.http.post(this.url+"operations/virement",operation).subscribe();
       }
    }
     this.getCompteDetail(compteOrig.codeCompte);
     return erreur;
  }

}