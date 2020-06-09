import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ProfileTriggerComponent } from './profile-trigger/profile-trigger.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertMessageComponent } from './alert-message/alert-message.component';

const COMPONENTS = [
  ProfileTriggerComponent,
  AlertMessageComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class SharedModule { }
