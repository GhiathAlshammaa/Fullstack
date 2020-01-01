import { Component, OnInit, Input } from '@angular/core';
// import { WebService } from '../web.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: 'posts-list.component.html',
  styleUrls: ['posts-list.component.css']
})
export class PostListComponent  {

  @Input() posts: Post[] = [];
  // constructor(private webService: WebService) { }
}
