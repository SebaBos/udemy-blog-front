import { Component, OnInit, DoCheck } from '@angular/core';
import { global } from './services/global';
import {UserService} from "./services/user.service";
import {CategoryService} from "./services/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Blog Angular';
  public identity: any;
  public token: any;
  public url;
  public categories!: any;

  constructor(private _userService: UserService, private _categoryService: CategoryService) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit() {
    console.log('Aplicación cargada correctamente');
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
