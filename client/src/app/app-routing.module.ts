import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

const routes: Routes = [
  {path: '', redirectTo: '/buscador', pathMatch: 'full'},
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
