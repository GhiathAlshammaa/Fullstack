import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  projectTitle = 'Messages Board App';
  messages = [{text: 'First Text' , owner: 'Maher'}, {text: 'Second Text', owner: 'Hamdo'} ];
  constructor() { }

  ngOnInit() {
  }

}
