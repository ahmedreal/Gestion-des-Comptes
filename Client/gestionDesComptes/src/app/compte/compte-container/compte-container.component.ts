import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profil } from '../../share/models/profil.model';
import { Compte } from '../../share/models/compte.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { OperationService } from '../operation.service';

@Component({
  selector: 'app-compte-container',
  templateUrl: './compte-container.component.html',
  styleUrls: ['./compte-container.component.css']
})
export class CompteContainerComponent implements OnInit,OnDestroy {

  public codeCompte: string;
  public compte:Compte;
  public listCodeComptes:string[];
  public sub1:Subscription; 
  public sub2:Subscription; 
  public sub3:Subscription; 

  constructor(private activatedRoute:ActivatedRoute, private opService:OperationService) { 

  }

  ngOnInit() {
    this.sub1 = this.activatedRoute.paramMap.subscribe((params:ParamMap) =>{
      this.codeCompte = params.get('codeCompte');
      this.opService.getCompteDetail(this.codeCompte);
      //this.opService.getListCodeComptes();
    });
    this.sub2 = this.opService.compte.subscribe(compte => this.compte = compte);
    this.sub3 = this.opService.listcodeComptes.subscribe(listCodeComptes => this.listCodeComptes = listCodeComptes);  
  }

  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe;
    if(this.sub2)
      this.sub2.unsubscribe;
    if(this.sub3)
      this.sub3.unsubscribe;
  }
    
}
