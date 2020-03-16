import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";
import { postTypes } from "./postTypes.enum";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  // a list of posts to active Observable, in order to auto updated
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                type: post.type,
                content: post.content,
                id: post._id,
                image: post.image,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostsData => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostsData.maxPosts
        });
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      type: postTypes;
      content: string;
      image: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("type", (post.type as unknown) as string);
    postData.append("image", post.image, post.title);

    this.http
      .post<{ message: string; post: Post }>(BACKEND_URL, postData)
      .subscribe(responseData => {
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
        image: post.image,
        creator: null
      };
    }
    this.http.put(BACKEND_URL + id, postData).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
