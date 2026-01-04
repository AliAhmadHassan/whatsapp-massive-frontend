import { ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { CampanhaService } from './../../services/campanha/campanha.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campanha-list',
  templateUrl: './campanha-list.component.html',
  styleUrls: ['./campanha-list.component.css']
})
export class CampanhaListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message:{};
  classCss: {};
  listCampanhas=[];
  constructor(
    private campanhaService: CampanhaService,
    private dialogService: DialogService,    
    private router: Router
    ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findByEmpresaId(this.page, this.count, this.shared.empresa.id);
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    this.campanhaService.findByEmpresaId(page, count, empresaId).subscribe((responseApi: ResponseApi) => {
      this.listCampanhas = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id:number){
    this.router.navigate(['/campanha-new',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Do you want to delete the ticket ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.campanhaService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findByEmpresaId(this.page,this.count, this.shared.empresa.id);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
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
