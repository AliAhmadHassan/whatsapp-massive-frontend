import { ResponseApi } from './../../model/response-api';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { ContatoService } from './../../services/contato/contato.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css']
})
export class ContatoListComponent implements OnInit {

  id: number;
  shared: SharedService;
  message:{};
  classCss: {};
  listContatos=[];
  constructor(
    private contatoService: ContatoService,
    private dialogService: DialogService,    
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    console.log("ngOnInit");
    if (this.id != this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];

      if (this.id != undefined) {
        this.findByLoteId(this.id);
      }
    }
  }

  findByLoteId(loteId: number){
    this.contatoService.findByLoteId(loteId).subscribe((responseApi: ResponseApi) => {
      this.listContatos = responseApi['data'];
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id:number){
    this.router.navigate(['/contato-new',id]);
  }

  importar(id:number){
    this.router.navigate(['/contato-importar',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Do you want to delete the ticket ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.contatoService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findByLoteId(this.shared.empresa.id);
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
