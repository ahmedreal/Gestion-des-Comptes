import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Compte } from '../../../share/models/compte.model';
import { OperationService } from '../../operation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compte-detail',
  templateUrl: './compte-detail.component.html',
  styleUrls: ['./compte-detail.component.css']
})
export class CompteDetailComponent implements OnInit, OnDestroy {

  @Input() listCodeComptes:string[];
  public compte:Compte;
  public sub:Subscription;

  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe((compte:Compte)=> this.compte = compte);
  }

  ngOnDestroy(){
  if(this.sub)
    this.sub.unsubscribe;
  }

}
