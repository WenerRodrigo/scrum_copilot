import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  password: string = '';
  visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewPassword() {
    this.visible = !this.visible;
  }

  singnIn() {
    alert('Você está logado!');
  }

}
