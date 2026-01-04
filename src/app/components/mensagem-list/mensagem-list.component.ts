import { ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { MensagemService } from './../../services/mensagem/mensagem.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-list',
  templateUrl: './mensagem-list.component.html',
  styleUrls: ['./mensagem-list.component.css']
})
export class MensagemListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message:{};
  classCss: {};
  listMensagens=[];
  constructor(private mensagemService:MensagemService,
    private dialogService: DialogService,    
    private router: Router) { 
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {
    this.findByEmpresaId(this.shared.empresa.id);
  }

  findByEmpresaId(empresaId: number){
    this.mensagemService.findByEmpresaId(empresaId).subscribe((responseApi: ResponseApi) => {
      this.listMensagens = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      })
    });
  }

  edit(id:number){
    this.router.navigate(['/mensagem-new',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Do you want to delete the ticket ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.mensagemService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findByEmpresaId(this.shared.empresa.id);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  private showMessage(message: {type: string, text :string}):void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string):void{
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
