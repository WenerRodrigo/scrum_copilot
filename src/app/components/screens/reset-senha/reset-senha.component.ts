import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  
  onSubmit() {
    if (this.resetSenhaForm.valid) {
      const password = this.resetSenhaForm.get('password')?.value;
      const confirmPassword = this.resetSenhaForm.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        this.authService.resetSenha(password).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('As senhas não são iguais');
      }
    }
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


  ngOnInit(): void {
  }
}
