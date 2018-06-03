import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OperationService } from '../../../share/service/operation.service';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit, OnChanges {

  @Input() codeCompte:string;
  public operations: Operation[];
  constructor(private opService:OperationService) { }

  ngOnInit() {}

  ngOnChanges(){
    //this.opService.getOperations(this.codeCompte).subscribe(operations => this.operations = operations);
    this.opService.compte.subscribe((compte:Compte) => {
      this.operations = compte.operations});
  }

}
