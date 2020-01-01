import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';



@Injectable({providedIn: 'root'})
export class PostsService {
    posts: Post[] = [];
    // a list of posts to active Observable, in order to auto updated
    private postUpdated = new Subject<Post[]>();
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    getPosts() {
        return [...this.posts];
    }

    addPost(post: Post) {
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }
}
