import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {UserService} from "../../services/user.service";
import {global} from "../../services/global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(private _postService: PostService, private _userService: UserService) {
    this.page_title = 'Inicio';
    this.url = global.url;
    this.posts = [];
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePost(id: number) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    )
  }
}
