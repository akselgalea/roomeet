import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthedGuard } from './guards/authed.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthedGuard]},
  {path: 'registro', component: RegisterComponent, canActivate: [AuthedGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'buscador', component: BuscadorComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard]},
  {path: 'preferencias', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path: "**", pathMatch: "full", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
