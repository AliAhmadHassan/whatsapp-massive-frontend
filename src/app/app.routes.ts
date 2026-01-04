import { ContatoNewComponent } from './components/contato-new/contato-new.component';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { LoteNewComponent } from './components/lote-new/lote-new.component';
import { LoteListComponent } from './components/lote-list/lote-list.component';
import { MensagemListComponent } from './components/mensagem-list/mensagem-list.component';
import { MensagemNewComponent } from './components/mensagem-new/mensagem-new.component';
import { CampanhaListComponent } from './components/campanha-list/campanha-list.component';
import { CampanhaNewComponent } from './components/campanha-new/campanha-new.component';
import { UsuarioNewComponent } from './components/usuario-new/usuario-new.component';
import { LoginComponent } from './components/security/login/login.component';
import { AuthGuard } from './components/security/auth.guard';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import{ Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/compiler/src/core';


export const ROUTES: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
    
    { path: 'usuario-list', component: UsuarioListComponent, canActivate: [AuthGuard]},
    { path: 'usuario-new', component: UsuarioNewComponent, canActivate: [AuthGuard]},
    { path: 'usuario-new/:id', component: UsuarioNewComponent, canActivate: [AuthGuard]},
    
    { path: 'campanha-list', component: CampanhaListComponent, canActivate: [AuthGuard]},
    { path: 'campanha-new', component: CampanhaNewComponent, canActivate: [AuthGuard]},
    { path: 'campanha-new/:id', component: CampanhaNewComponent, canActivate: [AuthGuard]},

    { path: 'mensagem-list', component: MensagemListComponent, canActivate: [AuthGuard]},
    { path: 'mensagem-new', component: MensagemNewComponent, canActivate: [AuthGuard]},
    { path: 'mensagem-new/:id', component: MensagemNewComponent, canActivate: [AuthGuard]},

    { path: 'lote-list', component: LoteListComponent, canActivate: [AuthGuard]},
    { path: 'lote-new', component: LoteNewComponent, canActivate: [AuthGuard]},
    { path: 'lote-new/:id', component: LoteNewComponent, canActivate: [AuthGuard]},

    { path: 'contato-list/:id', component: ContatoListComponent, canActivate: [AuthGuard]},
    { path: 'contato-new', component: ContatoNewComponent, canActivate: [AuthGuard]},
    { path: 'contato-new/:id', component: ContatoNewComponent, canActivate: [AuthGuard]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);