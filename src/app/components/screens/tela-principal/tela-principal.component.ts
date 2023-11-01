import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {
  meuFormulario: FormGroup;
  metas: any[] = [];
  metaEmEdicao: number | null = null;


  constructor(private formBuilder: FormBuilder) {
    this.meuFormulario = this.formBuilder.group({
      meta: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      id: ['', Validators.required],
      progresso: ['', Validators.required],
      nomeMeta: [''],
    })
  }


  ngOnInit(): void { }


  submitForm() {
    if (this.metaEmEdicao !== null) {
      this.salvarMeta();
    } else if (this.meuFormulario.valid) {
      const formValues = this.meuFormulario.value;
      formValues.nomeMeta = this.meuFormulario.get('nomeMeta')?.value;
      this.metas.push(formValues);
      this.resetForm();
    }
  }


  editar(index: number) {
    this.metaEmEdicao = index;
    const meta = this.metas[index];
    this.meuFormulario.setValue({
      meta: meta.meta,
      dataInicio: meta.dataInicio,
      dataFim: meta.dataFim,
      id: meta.id,
      progresso: meta.progresso,
      nomeMeta: meta.nomeMeta,
    })
  }

  salvar() {
    if (this.metaEmEdicao !== null) {
      this.salvarMeta();
    }
  }

  salvarMeta() {
    if (this.metaEmEdicao !== null && this.meuFormulario.valid) {
      this.metas[this.metaEmEdicao] = this.meuFormulario.value;
      this.resetForm();
      this.metaEmEdicao = null;
    }
  }

  remover(index: number) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.metas.splice(index, 1);
      this.resetForm();
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
}
