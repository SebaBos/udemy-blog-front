// Imports necesarios
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

// Importar componentes
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {CategoryNewComponent} from "./components/category-new/category-new.component";
import {PostNewComponent} from "./components/post-new/post-new.component";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";
import {PostEditComponent} from "./components/post-edit/post-edit.component";
import {CategoryDetailComponent} from "./components/category-detail/category-detail.component";
import {ProfileComponent} from "./components/profile/profile.component";

import {IdentityGuardService} from "./services/identity.guard.service";

// Definir rutas
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuardService]},
  {path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuardService]},
  {path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuardService]},
  {path: 'entrada/:id', component: PostDetailComponent},
  {path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuardService]},
  {path: 'categoria/:id', component: CategoryDetailComponent},
  {path: 'perfil/:id', component: ProfileComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];

// Exportar configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
