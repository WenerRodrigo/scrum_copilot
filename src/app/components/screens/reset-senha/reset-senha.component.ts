import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EndPointService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

  password: string = '';
  visible: boolean = false;
  closeVisible: boolean = false;
  resetSenhaForm: FormGroup;

  constructor(private authService: EndPointService, private formBuilder: FormBuilder) {
    this.resetSenhaForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

    })

  }

  onSubmit() {
    if (this.resetSenhaForm.valid) {
      const email = this.resetSenhaForm.get('email')?.value;
      const password = this.resetSenhaForm.get('password')?.value;
    } else {
      console.log("Senha inválida: " + this.resetSenhaForm.value.password)
    }
    console.log("this.password")
    console.log(this.password)
    //this.singIn(this.password)
  }

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  singIn() {
    this.authService.signUp(this.password).subscribe(
      (response: any) => {
        console.log('Cadastro realizado com sucesso');
      },
      (error: any) => {
        console.error('Erro ao cadastrar:', error);
      }
    );
  }

  ngOnInit(): void {
  }
}
