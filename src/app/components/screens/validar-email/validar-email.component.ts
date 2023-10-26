import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {

  email: string = "";
  inputInvalid: boolean = false;

  constructor(private authService: AuthService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  enviarEmail() {
    if (this.email === '' || !this.validarEmail(this.email)) {
      this.inputInvalid = true;
      this.email = '';
      this.setFocusOnEmailField();
      alert('Email inválido!');
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

  validarEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }

  setFocusOnEmailField() {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('#email').focus();
    }, 0);
  }
}