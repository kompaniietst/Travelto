import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProfileTriggerComponent } from './profile-trigger/profile-trigger.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { TestComponent } from './test/test.component';


const routes: Routes = []


const COMPONENTS = [
  ProfileTriggerComponent,
  AlertMessageComponent,
  SidebarComponent,
 
  NavbarComponent,
  FormComponent,
  FormControlComponent

];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatButtonModule, // material
  MatMenuModule,
  MatDialogModule,

  FormsModule, ReactiveFormsModule,

  RouterModule.forRoot(routes)
];

@NgModule({
  declarations: [ WrapperComponent,...COMPONENTS],
  imports: [...MODULES],
  exports: [ WrapperComponent,...COMPONENTS,
    FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
