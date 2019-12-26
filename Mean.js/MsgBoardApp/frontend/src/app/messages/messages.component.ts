import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages = [{text: 'Some Text' , owner: 'Tim'}, {text: 'Some Text', owner: 'Tim'} ];
  constructor() { }

  ngOnInit() {
  }

}
