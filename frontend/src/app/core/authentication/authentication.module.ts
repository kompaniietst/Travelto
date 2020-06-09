import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const COMPONENTS = [
  LoginComponent,
  RegistrationComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,
  FormsModule, 
  ReactiveFormsModule,
  
  MatDialogModule, MatIconModule,

  SharedModule,
]

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AuthenticationModule { }
