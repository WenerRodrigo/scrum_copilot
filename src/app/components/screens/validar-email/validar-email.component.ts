import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {

  email: string = "";
  inputInvalid: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  enviarEmail() {
    if (this.email === '') {
      this.inputInvalid = true;
      return;
    }

    const emailObj = {
      email: this.email
    };

    this.authService.recuperarEmail(emailObj).subscribe(
      (response: any) => {
        alert('Email enviado com sucesso!');
      },
      (error: any) => {
        console.error('Erro ao enviar o email:', error);
      }
    );
  }
}
