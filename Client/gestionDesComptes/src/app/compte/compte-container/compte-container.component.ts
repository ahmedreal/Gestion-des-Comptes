import { Component, OnInit } from '@angular/core';
import { Profil } from '../../share/models/profil.model';
import { Compte } from '../../share/models/compte.model';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { OperationService } from '../operation.service';

@Component({
  selector: 'app-compte-container',
  templateUrl: './compte-container.component.html',
  styleUrls: ['./compte-container.component.css']
})
export class CompteContainerComponent implements OnInit {

  public codeCompte: string;
  public compte:Compte;
  public listCodeComptes:string[];
  constructor(private activatedRoute:ActivatedRoute, private opService:OperationService) { 

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) =>{
      this.codeCompte = params.get('codeCompte');
      this.opService.getCompteDetail(this.codeCompte);
      //this.opService.getListCodeComptes();
    });
    this.opService.compte.subscribe(compte => this.compte = compte);
    this.opService.listcodeComptes.subscribe(listCodeComptes => this.listCodeComptes = listCodeComptes);  
  }
    
}
