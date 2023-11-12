import { Component, OnInit } from '@angular/core';
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

  constructor( private formBuilder: FormBuilder, private authService: EndPointService, private route: ActivatedRoute) {
    this.meuFormulario = this.formBuilder.group({
      titulo_etapa: ['', Validators.required],
      descricao: ['', Validators.required],
      identificador_responsavel: ['', Validators.required],
      data_conclusao_prevista: [''],
    });

    this.colaboradores = [
      {identificador_usuario: '00000000-0000-0000-0000-000000000000', nome_completo: 'Nenhum'},
      {identificador_usuario: '5430F498-F28E-432B-882D-45592291B57A', nome_completo: 'João Vitor'},
      {identificador_usuario: 'E3D5BB9A-3C93-433A-93BF-40166F37150D', nome_completo: 'RAPAZ'}
    ];

    this.route.queryParams.subscribe( params =>{
      this.identificador_meta = params['identificador_meta'];
    })
    
    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  submitForm() {
    const data: Data = ({
      titulo_etapa: this.meuFormulario.value.titulo_etapa,
      descricao: this.meuFormulario.value.descricao,
      identificador_responsavel: this.meuFormulario.value.identificador_responsavel,
      data_conclusao_prevista: this.meuFormulario.value.data_conclusao_prevista
    })
    console.log(data)

    if (this.metaEmEdicao !== null) {
      this.authService.criarEtapa(this.identificador_meta, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
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

      this.authService.criarEtapa(this.identificador_meta, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
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
      const formValues = this.meuFormulario.value;
      this.metas.push(formValues);
    }
    else {
      console.log(data)
    }
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


  ngOnInit(): void { 
    this.authService.selectEtapas(this.identificador_meta, this.identificador_usuario, this.supervisor).subscribe({
      next: (response) => {
        if (response.response === 200) {
          // this.metaSalva = true;

          response.dados_extras.forEach((meta: any) => {
            // meta.data_inicio = new Date(meta.data_inicio).toISOString().split('T')[0]
            // meta.data_conclusao_prevista = new Date(meta.data_conclusao_prevista).toISOString().split('T')[0]
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

  editar(meta: Meta) {
    this.metaEmEdicao = meta.nomeMeta;
  }

  remover(index: number) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.metas.splice(index, 1);
    }
  }
}



interface Meta {
  nomeMeta: string;
  meta: string;
  dataInicio: Date;
  dataFim: Date;
  responsavel: string;
  status: string;
}



interface Colaborador {
  identificador_usuario: string;
  nome_completo: string;
}

