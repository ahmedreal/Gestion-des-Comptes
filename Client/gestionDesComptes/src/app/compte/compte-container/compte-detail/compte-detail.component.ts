import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OperationService } from '../../../share/service/operation.service';
import { Compte } from '../../../share/models/compte.model';

@Component({
  selector: 'app-compte-detail',
  templateUrl: './compte-detail.component.html',
  styleUrls: ['./compte-detail.component.css']
})
export class CompteDetailComponent implements OnInit, OnChanges {

  @Input() listCodeComptes:string[];
  public compte:Compte;
  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe((compte:Compte)=> this.compte = compte);
  }

  ngOnChanges(){

  }

}
