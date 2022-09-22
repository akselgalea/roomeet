import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { UserService } from './services/user.service';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { CreateComponent } from './components/user/create/create.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserFormComponent,
    BuscadorComponent,
    PerfilComponent,
    CreateComponent,
    PagenotfoundComponent,
    ConfiguracionComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
