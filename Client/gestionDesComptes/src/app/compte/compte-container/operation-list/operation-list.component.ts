import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../../share/service/operation.service';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  public operations: Operation[];
  constructor(private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe((compte:Compte) => {
      this.operations = compte.operations});
  }

}
