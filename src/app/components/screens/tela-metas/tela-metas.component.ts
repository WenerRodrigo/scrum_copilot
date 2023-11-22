import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tela-metas',
  templateUrl: './tela-metas.component.html',
  styleUrls: ['./tela-metas.component.css']
})



export class TelaMetasComponent implements OnInit {
  meuFormulario!: FormGroup;
  metas: Meta[] = [];
  colaboradores: Colaborador[] = [];
  searchText: string = '';
  metaEmEdicao: string | null = null;
  isPopupVisible: boolean = false;
  originalMetas: any[] = [];
  identificador_meta: string = '';
  identificador_usuario: string;
  supervisor: boolean;
  etapa: any;
  textareaElement: HTMLInputElement | any;
  event: HTMLTextAreaElement | any;
  aluno: boolean;


  // textArea
  @ViewChild('textareaElement') set content(content: ElementRef | any) {
    this.textareaElement = content;
    this.adjustTextareaHeight();
  }


  constructor(private formBuilder: FormBuilder, private authService: EndPointService, private route: ActivatedRoute, private renderer: Renderer2) {
    this.meuFormulario = this.formBuilder.group({
      titulo_etapa: ['', Validators.required],
      descricao: ['', Validators.required],
      identificador_responsavel: ['', Validators.required],
      data_conclusao_prevista: [''],
      progresso: [''],
      impedimentos: [''],

    });

    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
    this.aluno = !this.supervisor;

    this.route.queryParams.subscribe(params => {
      this.identificador_meta = params['identificador_meta'];
    })

    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
  }

  ngOnInit(): void {
    this.authService.getEtapas(this.identificador_meta, this.identificador_usuario, this.supervisor).subscribe({
      next: (response) => {
        console.log(response.dados_extras);
        if (response.response === 200) {
          //this.metaSalva = true;
          response.dados_extras.forEach((meta: any) => {
            meta.data_conclusao_prevista = new Date(meta.data_conclusao_prevista).toISOString().split('T')[0]
            this.originalMetas.push(meta)
          });

          this.metas = [...this.originalMetas];

          console.log(response.dados_extras)


        }
        else {
          console.log('erro na resposta', response)
          alert(response.mensagem)
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    });

    this.authService.getColaboradores().subscribe({
      next: (response) => {
        if (response.response === 200) {
          //this.metaSalva = true;
          this.colaboradores.push({ identificador_usuario: "00000000-0000-0000-0000-000000000000", nome_completo: "NENHUM" })
          response.dados_extras.forEach((colaborador: any) => {
            this.colaboradores.push(colaborador)
          });

          this.metas = [...this.originalMetas];

          console.log(response.dados_extras)


        }
        else {
          console.log('erro na resposta', response)
          alert(response.mensagem)
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    });
  }


  // textArea
  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  // textArea
  @HostListener('input', ['$event.target'])
  onInput(_textarea: HTMLTextAreaElement): void {
    this.adjustTextareaHeight();
  }

  // textArea
  adjustTextareaHeight(): void {
    const textareaElement = this.textareaElement.nativeElement as HTMLTextAreaElement;
    textareaElement.style.overflow = 'hidden';
    textareaElement.style.height = '65px';
    textareaElement.style.height = `${textareaElement.scrollHeight}px`;
  }


  submitForm() {
    const data: Data = {
      titulo_etapa: this.meuFormulario.value.titulo_etapa,
      descricao: this.meuFormulario.value.descricao,
      identificador_responsavel: this.meuFormulario.value.identificador_responsavel,
      data_conclusao_prevista: this.meuFormulario.value.data_conclusao_prevista,
      progresso: this.meuFormulario.value.progresso || 0,
      impedimentos: this.meuFormulario.value.impedimentos || ''
    };


    if (this.metaEmEdicao) {
      this.authService.editarEtapa(this.metaEmEdicao, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.metaEmEdicao = null;
            this.meuFormulario.reset;
            this.closePopup();
            window.location.reload();

          }
          else {
            console.log(response);
            alert(response.mensagem);
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    } else if (this.metaEmEdicao === null && this.meuFormulario.valid) {
      this.authService.criarEtapa(this.identificador_meta, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.metaEmEdicao = null;
            this.meuFormulario.reset;
            this.closePopup();
            window.location.reload();


            this.metas = [...this.metas, response.novaEtapa];
          }
          else {
            console.log(response);
            alert(response.mensagem);
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    } else {
      console.log(data);
    }
  }

  openPopup() {
    this.isPopupVisible = true;

    // if(this.metaEmEdicao === null){
    //   this.meuFormulario.value.identificador_responsavel = this.identificador_usuario;
    // }
  }

  closePopup() {
    this.isPopupVisible = false;
  }


  //Barra de Progresso
  getProgressBarStyle(progresso: number) {
    if (progresso < 40) {
      return { 'width': progresso + '%', 'background-color': 'red' };
    } else {
      return { 'width': progresso + '%', 'background-color': '#4CAF50' };
    }
  }


  //Campo de pesquisa
  applyFilter() {
    console.log(this.searchText)
    if (this.searchText.trim() !== '') {
      this.metas = this.originalMetas.filter(meta =>
        meta.titulo_etapa.toLowerCase().includes(this.searchText.toLowerCase()) ||
        meta.descricao && meta.descricao.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.metas = [...this.originalMetas];
    }

    console.log(this.metas)
  }

  // Converte de number para string o campo responsavél
  encontrarNomeResponsavel(identificador: string): string {
    const colaborador = this.colaboradores.find(c => c.identificador_usuario === identificador);
    return colaborador ? colaborador.nome_completo : 'Wener';
  }



  editarEtapa(index: string) {
    this.metaEmEdicao = index;
    this.etapa = this.metas.find(meta => meta.identificador_etapa === index);
    this.meuFormulario.patchValue(this.etapa);
    this.openPopup();
  }

  removerEtapa(index: string) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.authService.deleteEtapa(index).subscribe({
        next: (response) => {
          if (response.response === 200) {
            //alert('Deseja realmente deletar a meta?');
            //window.location.reload();
            this.metas = this.metas.filter(meta => meta.identificador_etapa !== index);
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao deletar:', error);
        }
      });
    }
  }
}



interface Meta {
  identificador_etapa: string;
  titulo_etapa: string;
  descricao: string;
  data_conclusao: Date;
  data_conclusao_prevista: Date;
  identificador_responsavel: string;
  progresso: number;
  impedimentos: string;
  status: string;
  nome_completo: string;
}



interface Colaborador {
  identificador_usuario: string;
  nome_completo: string;
}

