import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:8000/api/";
  constructor(private http: HttpClient) { }

  login(loginObj:any) {
    return this.http.post<any>(`${this.baseUrl}usuarios/authentication`, loginObj);
  }

  signUp(signUpObj:any) {
    return this.http.post<any>(`${this.baseUrl}usuarios/gerarusuario`, signUpObj);
  }

  recuperarEmail(emailObj:any) {
    return this.http.post<any>(`${this.baseUrl}usuarios/recuperarsenha_email`, emailObj);
  }

  validToken(tokenObj:any) {
    return this.http.post<any>(`${this.baseUrl}usuarios/token`, tokenObj);
  }

  resetSenha(resetSenhaObj:any) {
    return this.http.post<any>(`${this.baseUrl}usuarios/novasenha`, resetSenhaObj);
  }

}
