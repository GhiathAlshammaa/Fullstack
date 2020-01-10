import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';
import { identifierModuleUrl } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
import { postTypes } from './postTypes.enum';



@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    // a list of posts to active Observable, in order to auto updated
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    getPosts() {
        this.http
        .get<{message: string, posts: any}>(
            'http://localhost:3000/api/posts'
        )
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    type: post.type,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPost(id: string) {
        return this.http.get<{_id: string, title: string, type: postTypes, content: string}>('http://localhost:3000/api/posts/' + id);
    }

    addPost(post: Post) {
        this.http
            .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
            .subscribe(responseData => {
                const id = responseData.postId;
                post.id = id;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, post: Post) {
        this.http
       .put('http://localhost:3000/api/posts/' + id, post)
       .subscribe(response => {
         const updatedPosts = [...this.posts];
         const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
         updatedPosts[oldPostIndex] = post;
         this.posts = updatedPosts;
         this.postsUpdated.next([...this.posts]);
         this.router.navigate(['/']);
       });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter( post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}
