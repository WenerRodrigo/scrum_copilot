import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/screens/home/home.component';
import { TelaCadastroComponent } from './components/screens/tela-cadastro/tela-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelaPrincipalComponent } from './components/screens/tela-principal/tela-principal.component';
import { ResetSenhaComponent } from './components/screens/reset-senha/reset-senha.component';
import { ValidarEmailComponent } from './components/screens/validar-email/validar-email.component';
import { ValidarTokenComponent } from './components/screens/validar-token/validar-token.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    TelaCadastroComponent,
    TelaPrincipalComponent,
    ResetSenhaComponent,
    ValidarEmailComponent,
    ValidarTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
