import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(1, '','', 'ROLE_USER', '', '', '', '');
    this.status = '';
  }

  ngOnInit() {
    // Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro sure por la url
    this.logout();
  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        // Token
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          // Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              console.log(this.token);
              console.log(this.identity);

              // Persistir datos del usuario identificado
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              // Redirección a inicio
              this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = error;
        console.log(<any>error);
      }
    )
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirección a inicio
        this._router.navigate(['inicio']);
      }
    });
  }
}
