import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { TelaCadastroComponent } from './components/screens/tela-cadastro/tela-cadastro.component';
import { TelaPrincipalComponent } from './components/sreens/tela-principal/tela-principal.component';
import { ResetSenhaComponent } from './components/screens/reset-senha/reset-senha.component';
import { ValidarEmailComponent } from './components/screens/validar-email/validar-email.component';
import { ValidarTokenComponent } from './components/screens/validar-token/validar-token.component';


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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
