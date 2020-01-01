import { Component, EventEmitter , Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { postTypes } from '../postTypes.enum';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(private postsService: PostsService) { }
  enteredContent = '';
  enteredTitle = '';

  // Post Types variables
  // an Array of types
  types = postTypes;
  // a variable content the value, which User'll select
  // userOption: postTypes = postTypes.postType1; /* after use FormModel, we don't need any more */
  // a array content the indexs, to the types enum
  typeOptions = Object.keys(postTypes).filter(x => Number(x) >= 0 );
  @Output() postCreated = new EventEmitter<Post>();

  ngOnInit() {
    console.log('valueOptions: ' + this.typeOptions);
  }
  onAddPost(form: NgForm) {
    // if the User doesn't enter the values as expected, don't create a new post
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
      type: form.value.type
    };
    this.postCreated.emit(post);
  }

}
