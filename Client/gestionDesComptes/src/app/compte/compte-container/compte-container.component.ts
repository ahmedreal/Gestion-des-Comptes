import { Component, OnInit, OnChanges } from '@angular/core';
import { ProfilService } from '../../share/service/profil.service';
import { Profil } from '../../share/models/profil.model';
import { Compte } from '../../share/models/compte.model';
import { AuthentifficationService } from '../../share/service/authentiffication.service';
import { OperationService } from '../../share/service/operation.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-compte-container',
  templateUrl: './compte-container.component.html',
  styleUrls: ['./compte-container.component.css']
})
export class CompteContainerComponent implements OnInit {

  public codeCompte: string;
  public compte:Compte;
  constructor(private activatedRoute:ActivatedRoute, private opService:OperationService) { 

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) =>{
      this.codeCompte = params.get('codeCompte');
      this.opService.getCompteDetail(this.codeCompte);
    });
    this.opService.compte.subscribe(compte => this.compte = compte);
    }

}
