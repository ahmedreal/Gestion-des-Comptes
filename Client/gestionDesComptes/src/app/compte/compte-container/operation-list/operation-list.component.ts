import { Component, OnInit, OnDestroy } from '@angular/core';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';
import { OperationService } from '../../operation.service';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit, OnDestroy {

  public operations: Operation[];
  public p:Page;
  public sub:Subscription;

  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.sub = this.opService.compte.subscribe((compte:Compte) => {
      this.operations = compte.operations});
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe;
  }

}
