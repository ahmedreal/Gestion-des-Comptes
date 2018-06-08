import { Component, OnInit, Input } from '@angular/core';
import { Compte } from '../../../share/models/compte.model';
import { OperationService } from '../../operation.service';

@Component({
  selector: 'app-compte-detail',
  templateUrl: './compte-detail.component.html',
  styleUrls: ['./compte-detail.component.css']
})
export class CompteDetailComponent implements OnInit {

  @Input() listCodeComptes:string[];
  public compte:Compte;
  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe((compte:Compte)=> this.compte = compte);
  }

}
