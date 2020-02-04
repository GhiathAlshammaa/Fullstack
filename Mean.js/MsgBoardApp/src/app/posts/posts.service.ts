import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";
import { identifierModuleUrl } from "@angular/compiler";
import { Title } from "@angular/platform-browser";
import { postTypes } from "./postTypes.enum";
import { Content } from "@angular/compiler/src/render3/r3_ast";

@Injectable({ providedIn: "root" })
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
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              type: post.type,
              content: post.content,
              id: post._id,
              image: post.image
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      type: postTypes;
      content: string;
      image: string;
    }>("http://localhost:3000/api/posts/" + id);
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("type", (post.type as unknown) as string);
    postData.append("image", post.image, post.title);

    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        const post2: Post = {
          id: responseData.post.id,
          title: post.title,
          type: post.type,
          content: post.content,
          image: responseData.post.image
        };
        this.posts.push(post2);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, post: Post) {
    let postData: Post | FormData;
    if (typeof post.image === "object") {
      postData = new FormData();
      postData.append("id", post.id);
      postData.append("title", post.title);
      postData.append("content", post.content);
      postData.append("type", (post.type as unknown) as string);
      postData.append("image", post.image, post.title);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        content: post.content,
        type: post.type,
        image: post.image
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post2: Post = {
          id: post.id,
          title: post.title,
          content: post.content,
          type: post.type,
          image: ""
        };
        updatedPosts[oldPostIndex] = post2;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
