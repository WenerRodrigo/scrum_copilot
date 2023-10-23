import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { TelaCadastroComponent } from './components/screens/tela-cadastro/tela-cadastro.component';
import { TelaPrincipalComponent } from './components/sreens/tela-principal/tela-principal.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
