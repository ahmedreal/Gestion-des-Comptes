import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';
import { OperationService } from '../../operation.service';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  public operations: Operation[];
  public p:Page;

  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe((compte:Compte) => {
      this.operations = compte.operations});
  }

}
