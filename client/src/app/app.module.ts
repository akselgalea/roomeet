import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { UserService } from './services/user.service';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BuscadorComponent,
    PerfilComponent,
    PagenotfoundComponent,
    ConfiguracionComponent,
    FavoritosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
