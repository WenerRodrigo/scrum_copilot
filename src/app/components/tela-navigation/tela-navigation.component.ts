import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-navigation',
  templateUrl: './tela-navigation.component.html',
  styleUrls: ['./tela-navigation.component.css']
})
export class TelaNavigationComponent implements OnInit {
  userEmail: string;
  constructor() {
    const storedEmail = localStorage.getItem('userEmail');
    this.userEmail = storedEmail || '';
  }

  ngOnInit(): void {
  }

}
