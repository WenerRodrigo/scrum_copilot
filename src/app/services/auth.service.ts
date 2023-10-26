import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:8000/api/usuarios/";
  constructor(private http: HttpClient) { }

  login(loginObj:any) {
    return this.http.post<any>(`${this.baseUrl}authentication`, loginObj);
  }

  singIn(signUpObj:any) {
    return this.http.post<any>(`${this.baseUrl}gerarusuario`, signUpObj);
  }

  recuperarEmail(emailObj:any) {
    return this.http.post<any>(`${this.baseUrl}recuperarsenha_email`, emailObj);
  }

  validToken(tokenObj:any) {
    return this.http.post<any>(`${this.baseUrl}token`, tokenObj);
  }

  resetSenha(resetSenhaObj:any) {
    return this.http.post<any>(`${this.baseUrl}novasenha`, resetSenhaObj);
  }

}
