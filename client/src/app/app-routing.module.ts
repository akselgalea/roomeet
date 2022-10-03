import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'buscador', component: BuscadorComponent},
  {path: 'user/:id', component: PerfilComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'preferencias', component: ConfiguracionComponent},
  {path: "**", pathMatch: "full", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
