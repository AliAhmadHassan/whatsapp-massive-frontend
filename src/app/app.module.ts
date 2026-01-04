import { ContatoImportarService } from './services/contato-importar/contato-importar.service';
import { DialogService } from './services/dialog.service';
import { AuthGuard } from './components/security/auth.guard';
import { TipoArquivoService } from './services/tipo-arquivo/tipo-arquivo.service';
import { LoteService } from './services/lote/lote.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { ContatoService } from './services/contato/contato.service';
import { CampanhaService } from './services/campanha/campanha.service';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioNewComponent } from './components/usuario-new/usuario-new.component';
import { ContatoStatusService } from './services/contato-status/contato-status.service';
import { MensagemService } from './services/mensagem/mensagem.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { LoginComponent } from './components/security/login/login.component';
import { CampanhaListComponent } from './components/campanha-list/campanha-list.component';
import { CampanhaNewComponent } from './components/campanha-new/campanha-new.component';
import { MensagemListComponent } from './components/mensagem-list/mensagem-list.component';
import { MensagemNewComponent } from './components/mensagem-new/mensagem-new.component';
import { LoteListComponent } from './components/lote-list/lote-list.component';
import { LoteNewComponent } from './components/lote-new/lote-new.component';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoNewComponent } from './components/contato-new/contato-new.component';
import { ContatoImportarComponent } from './components/contato-importar/contato-importar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    UsuarioListComponent,
    UsuarioNewComponent,
    LoginComponent,
    CampanhaListComponent,
    CampanhaNewComponent,
    MensagemListComponent,
    MensagemNewComponent,
    LoteListComponent,
    LoteNewComponent,
    ContatoListComponent,
    ContatoNewComponent,
    ContatoImportarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [AuthGuard, 
    CampanhaService,
    ContatoService,
    ContatoStatusService,
    ContatoImportarService,
    EmpresaService,
    LoteService,
    MensagemService,
    TipoArquivoService,
    UsuarioService,
    DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
