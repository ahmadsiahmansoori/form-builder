import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharingModule } from '../sharing/sharing.module';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharingModule
  ]
})
export class AuthModule { }
