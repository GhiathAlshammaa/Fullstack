import { Component, OnInit, Input } from '@angular/core';
// import { WebService } from '../web.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: 'posts-list.component.html',
  styleUrls: ['posts-list.component.css']
})
export class PostListComponent  {

  @Input() posts = [];
  // constructor(private webService: WebService) { }
}
