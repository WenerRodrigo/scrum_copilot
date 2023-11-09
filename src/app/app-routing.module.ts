import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { TelaCadastroComponent } from './components/screens/tela-cadastro/tela-cadastro.component';
import { TelaPrincipalComponent } from './components/screens/tela-principal/tela-principal.component';
import { ResetSenhaComponent } from './components/screens/reset-senha/reset-senha.component';
import { ValidarEmailComponent } from './components/screens/validar-email/validar-email.component';
import { ValidarTokenComponent } from './components/screens/validar-token/validar-token.component';
import { TelaSobreComponent } from './components/screens/tela-sobre/tela-sobre.component';
import { TelaDashboardComponent } from './components/screens/tela-dashboard/tela-dashboard.component';
import { TelaMetasComponent } from './components/screens/tela-metas/tela-metas.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component:
      HomeComponent
  },

  {
    path: 'telaPrincipal',
    component: TelaPrincipalComponent
  },

  {
    path: 'telaCadastro',
    component:
      TelaCadastroComponent
  },

  {
    path: 'validarEmail',
    component: ValidarEmailComponent
  },

  {
    path: 'validarToken',
    component: ValidarTokenComponent
  },

  {
    path: 'resetSenha',
    component: ResetSenhaComponent
  },

  {
    path: 'telaSobre',
    component: TelaSobreComponent
  },

  {
    path: 'telaDashboard',
    component: TelaDashboardComponent
  },

  {
    path: 'telaMetas',
    component: TelaMetasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
