import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  password: string = '';
  visible: boolean = false;
  loginForm!: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, this.ngModelValidator]]
    })
  }

  ngOnInit(): void {
  }

  ngModelValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const hasNgModel = control.value && control.value.includes('[(ngModel)]');
    return hasNgModel ? { ngModelError: true } : null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.error('Preencha os campos obrigatórios.');
    }
  }

  viewPassword() {
    this.visible = !this.visible;
  }

  singnIn() {
    alert('Você está logado!');
  }

}
