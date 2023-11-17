import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {
  meuFormulario: FormGroup;
  metas: any[] = [];
  metaEmEdicao: string | null = null;
  metaSalva: boolean = false;
  isPopupVisible: boolean = false;
  searchText: string = '';
  originalMetas: any[] = [];
  identificador_usuario: string;
  supervisor: boolean;

  constructor(private formBuilder: FormBuilder, private authService: EndPointService, private router: Router) {
    this.meuFormulario = this.formBuilder.group({
      titulo_meta: ['', Validators.required],
      descricao: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_conclusao_prevista: [''],
    })

    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
  }


  ngOnInit(): void {
    console.log('Antes de chamar o serviço');
    this.authService.selectMetas(this.identificador_usuario, this.supervisor).subscribe({
      next: (response) => {
        if (response.response === 200) {
          this.metaSalva = true;

          response.dados_extras.forEach((meta: any) => {
            meta.data_inicio = new Date(meta.data_inicio).toISOString().split('T')[0]
            meta.data_conclusao_prevista = new Date(meta.data_conclusao_prevista).toISOString().split('T')[0]
            this.originalMetas.push(meta)
          });

          this.metas = [...this.originalMetas];

          console.log(this.metas)
          console.log(response.dados_extras)
        }
        else {
          console.log(response)
          alert(response.mensagem)
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    });
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  applyFilter() {
    if (this.searchText.trim() !== '') {
      this.metas = this.originalMetas.filter(meta =>
        meta.titulo_meta.toLowerCase().includes(this.searchText.toLowerCase()) ||
        meta.descricao.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.metas = [...this.originalMetas];
    }
  }


  submitForm() {
    const data: Data = ({
      titulo_meta: this.meuFormulario.value.titulo_meta,
      descricao: this.meuFormulario.value.descricao,
      data_inicio: this.meuFormulario.value.data_inicio,
      data_conclusao_prevista: this.meuFormulario.value.data_conclusao_prevista
    })
    console.log(data)

    if (this.metaEmEdicao !== null) {
      this.authService.atualizarMeta(this.metaEmEdicao, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            // this.salvar();
            this.closePopup();
            // const formValues = this.meuFormulario.value;
            // this.metas.push(formValues);
            window.location.reload();
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    }
    else if (this.metaEmEdicao === null && this.meuFormulario.valid) {

      this.authService.criarMeta(data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            // this.salvar();
            this.closePopup();
            // const formValues = this.meuFormulario.value;
            // this.metas.push(formValues);
            window.location.reload();
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    }
    else {
      console.log(data)
    }
  }

  editar(index: string) {
    this.metaEmEdicao = index;
    this.meuFormulario.patchValue(this.metas.find(x => x.identificador_meta === this.metaEmEdicao));
    this.openPopup();
  }

  salvar() {
    if (this.metaEmEdicao !== null && this.meuFormulario.valid) {
      this.metas.find(x => x.identificador_meta === this.metaEmEdicao)[0] = this.meuFormulario.value;
      this.resetForm();
      this.metaEmEdicao = null;
      this.metaSalva = true;
    }
    else if (this.meuFormulario.valid) {
      // this.metas.push(this.meuFormulario.value);
      this.resetForm();
      this.metaEmEdicao = null;
      this.metaSalva = true;
    }
  }

  isListaMetasVazia(): boolean {
    return this.metas.length === 0;

  }

  remover(index: string) {
    if (confirm('Deseja realmente remover a meta?')) {

      this.authService.deleteMeta(index).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log(response.mensagem)
            window.location.reload();
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao excluir:', error);
        }
      });
      this.resetForm();

      if (this.isListaMetasVazia()) {
        this.metaSalva = false;
      }
    }
  }

  resetForm() {
    this.meuFormulario.reset();
    this.metaEmEdicao = null;
  }

  getProgressBarStyle(progresso: number) {
    if (progresso < 40) {
      return { 'width': progresso + '%', 'background-color': 'red' };
    } else {
      return { 'width': progresso + '%', 'background-color': '#4CAF50' };
    }
  }

  visualizarEtapa(identificador_meta:string){
    this.router.navigateByUrl("/telaEtapas?identificador_meta=" + identificador_meta)
  }
}
export class Meta {
  titulo_meta: string = '';
  descricao: string = '';
  data_inicio: Date = new Date();
  data_conclusao_prevista: Date = new Date();
  status: string = 'Pendente';
  progresso: number = 0;
}