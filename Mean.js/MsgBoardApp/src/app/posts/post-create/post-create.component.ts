import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { postTypes } from '../postTypes.enum';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  private mode = 'create';
  private postId: string;

  // Post Types variables
  // an Array of types
  types = postTypes;
  // a variable content the value, which User'll select
  // userOption: postTypes = postTypes.postType1; /* after use FormModel, we don't need any more */
  // a array content the indexs, to the types enum
  typeOptions = Object.keys(postTypes).filter(x => Number(x) >= 0 );

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, type: postData.type, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost(form: NgForm) {
    // if the User doesn't enter the values as expected, don't create a new post
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
      type: form.value.type
    };

    if (this.mode === 'create') {
      this.postsService.addPost(post);
    } else {
      post.id = this.postId;
      this.postsService.updatePost(this.postId, post);
    }
    form.resetForm();
  }

}
