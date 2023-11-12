import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-navigation',
  templateUrl: './tela-navigation.component.html',
  styleUrls: ['./tela-navigation.component.css']
})
export class TelaNavigationComponent implements OnInit {

  nome_usuario: string;

  constructor() {
    const nome_usuario = localStorage.getItem('nome_usuario');
    this.nome_usuario = nome_usuario || '';
   }

  ngOnInit(): void {
  }

}
