import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProfileTriggerComponent } from './profile-trigger/profile-trigger.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { AdvancedInputComponent } from './form/form-control/advanced-input/advanced-input.component';
import { ImagesComponent } from './form/form-control/images/images.component';
import { DropdownComponent } from './form/form-control/dropdown/dropdown.component';
import { RadioFinalComponent } from './form/form-control/radio-final/radio-final.component';
import { CheckboxComponent } from './form/form-control/checkbox/checkbox.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SpecialComponent } from './special/special.component';
import { TextFeaturesComponent } from './form/form-control/text-features/text-features.component';
import { CardComponent } from './card/card.component';


const routes: Routes = []


const COMPONENTS = [
  ProfileTriggerComponent,
  AlertMessageComponent,
  SidebarComponent,
  NavbarComponent,
  FormComponent,
  AdvancedInputComponent,
  ImagesComponent,
  DropdownComponent,
  RadioFinalComponent,
  CheckboxComponent,
  WrapperComponent,
  StarRatingComponent,
  CarouselComponent,
  FeedbackComponent,
  SpecialComponent,
  StarRatingComponent,
  CarouselComponent,
  FeedbackComponent,
  SpecialComponent,
  TextFeaturesComponent,
  CardComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatButtonModule, // material
  MatMenuModule,
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  DragDropModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatProgressSpinnerModule,

  FormsModule, ReactiveFormsModule,
  SlickCarouselModule,

  RouterModule.forRoot(routes)
];

@NgModule({
  declarations: [...COMPONENTS, CardComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS,
    FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
