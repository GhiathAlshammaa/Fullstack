// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
    posts: Post[] = [];

    getPosts() {
        return [...this.posts];
    }
    addPost(post: Post) {
        this.posts.push(post);
    }
}
