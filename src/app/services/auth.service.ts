import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  private baseUrl: string = "https://localhost:8000/api/";
  constructor(private http: HttpClient) { }

  login(loginObj:any) {
    console.log(loginObj)
    return this.http.post<any>(`${this.baseUrl}usuarios/authentication`, loginObj);
  }

  signUp(signUpObj:any) {
    delete signUpObj.confirmPassword
    return this.http.post<any>(`${this.baseUrl}usuarios/gerarusuario`, signUpObj);
  }

  recuperarEmail(emailObj: string) {
    return this.http.post<any>(this.baseUrl + 'usuarios/recuperarsenha_email/' + emailObj, undefined);
  }

  getToken(identificador_usuario: string) {
    return this.http.get<any>(this.baseUrl + 'usuarios/get_token/' + identificador_usuario, undefined);
  }

  resetSenha(resetSenhaObj: string) {
    return this.http.post<any>(this.baseUrl + 'usuarios/nova_senha' + resetSenhaObj, undefined);
  }

  criarMeta(metaObj: any) {
    return this.http.put<any>(this.baseUrl + 'sprint/novaMeta', metaObj);
  }

  atualizarMeta(identificador_meta:string, metaObj: any) {
    return this.http.post<any>(this.baseUrl + 'sprint/editMeta/' + identificador_meta, metaObj);
  }

  selectMetas() {
    return this.http.get<any>(this.baseUrl + 'sprint/getMetas');
  }

  deleteMeta(identificador_meta:string) {
    return this.http.delete<any>(this.baseUrl + 'sprint/deleteMeta/' + identificador_meta);
  }

}
