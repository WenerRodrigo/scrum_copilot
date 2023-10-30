import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {

  email: string = "";
  inputInvalid: boolean = false;
  validEmailForm!: FormGroup;

  constructor(private authService: EndPointService, private elementRef: ElementRef, private formBuilder: FormBuilder, private router: Router) {
    this.validEmailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviarEmail() {
    console.log(this.validEmailForm.value)
    if (this.validEmailForm.valid) {
      this.authService.recuperarEmail(this.validEmailForm.value.email).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Email enviado com sucesso');
            this.router.navigateByUrl("/home")
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.log(error)
          alert('Erro ao enviar email')
        }
      })
    }
    else {
      this.inputInvalid = true;
    }
    
  }

  //validarEmail(email: string): boolean {
  // const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  //return emailPattern.test(email);
  //}

  //setFocusOnEmailField() {
  //setTimeout(() => {
  // this.elementRef.nativeElement.querySelector('#email').focus();
  //}, 0);
  //}
}