import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/screens/home/home.component';
import { TelaCadastroComponent } from './components/screens/tela-cadastro/tela-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelaPrincipalComponent } from './components/sreens/tela-principal/tela-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    TelaCadastroComponent,
    TelaPrincipalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
