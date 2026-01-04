import { ResponseApi } from './../../model/response-api';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { LoteService } from './../../services/lote/lote.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message:{};
  classCss: {};
  listLotes=[];
  constructor(private loteService:LoteService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {
      this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
  }

  edit(id:number){
    this.router.navigate(['/lote-new',id]);
  }

  contatos(id:number){
    this.router.navigate(['/contato-list',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Realmente deseja deletar este lote?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.loteService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    this.loteService.findByEmpresaId(page, count, empresaId).subscribe((responseApi: ResponseApi) => {
      this.listLotes = responseApi['data']['content'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
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

  setNextPage(event: any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
    }
  }

  setPreviousPage(event: any){
    event.preventDefault();
    if(this.page > 0){
      this.page = this.page - 1;
      this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
    }
  }

  setPage(i: number, event: any){
    event.preventDefault();
    this.page = i;
    this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
  }
}
