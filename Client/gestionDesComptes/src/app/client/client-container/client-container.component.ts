import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../../share/models/client.model';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.css']
})
export class ClientContainerComponent implements OnInit {

  public clients:Client[];
  constructor(private clientService:ClientService) { }

  ngOnInit() {
  }

}
