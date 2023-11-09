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
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { TelaSobreComponent } from './components/screens/tela-sobre/tela-sobre.component';
import { TelaDashboardComponent } from './components/screens/tela-dashboard/tela-dashboard.component';
import { TelaNavigationComponent } from './components/tela-navigation/tela-navigation.component';
import { TelaMetasComponent } from './components/screens/tela-metas/tela-metas.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';



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
    TelaSobreComponent,
    TelaDashboardComponent,
    TelaNavigationComponent,
    TelaMetasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
