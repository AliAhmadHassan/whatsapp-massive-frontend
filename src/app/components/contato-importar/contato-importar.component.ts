import { LoteService } from './../../services/lote/lote.service';
import { Lote } from './../../model/lote.model';
import { ContatoImportar } from './../../model/ContatoImportar.model';
import { ContatoImportarService } from './../../services/contato-importar/contato-importar.service';
import { ResponseApi } from './../../model/response-api';
import { SharedService } from './../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';



@Component({
  selector: 'app-contato-importar',
  templateUrl: './contato-importar.component.html',
  styleUrls: ['./contato-importar.component.css']
})
export class ContatoImportarComponent implements OnInit {
  @ViewChild("form")
  form: NgForm;

  contatoImportar = new ContatoImportar(0, null, '', 0);
  contentFile: String;
  loteId: number;
  shared: SharedService;
  message: {};
  classCss: {};
  constructor(private contatoImportarService: ContatoImportarService,
    private loteService: LoteService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    if (this.loteId != this.route.snapshot.params['id']) {
      this.loteId = this.route.snapshot.params['id'];

      if (this.loteId != undefined) {
        this.findLoteById(this.loteId);
      }
    }
  }

  register() {
    this.message = {};

    this.contatoImportarService.createOrUpdate(this.contatoImportar).subscribe((responseApi: ResponseApi) => {
      this.contatoImportar = new ContatoImportar(0, null, '', 0);
      let contatoImportar: ContatoImportar = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findLoteById(loteId: number) {
    this.loteService.findById(loteId).subscribe((responseApi: ResponseApi) => {
      this.contatoImportar.lote = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 2000000) {
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2 MB'
      });
    } else {
      this.contatoImportar.caminho = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.contatoImportar.caminho = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }
}
