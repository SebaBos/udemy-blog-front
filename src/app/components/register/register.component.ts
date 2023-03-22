import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: UserService) {
    this.page_title = 'Regístrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
  }
  ngOnInit() {
    console.log('Componente de registro lanzado!');
    console.log(this._userService.test());
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}