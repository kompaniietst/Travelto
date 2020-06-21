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
import { NouisliderModule } from 'ng2-nouislider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

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
import { PipesModule } from '../pipes/pipes.module';
import { FilterTabsComponent } from './filter-tabs/filter-tabs.component';
import { SliderRangeComponent } from './form/form-control/slider-range/slider-range.component';

import { GoogleMapsComponent } from './form/form-control/google-maps/google-maps.component';
import { GoogleMapMarkerComponent } from './form/form-control/google-maps/google-map-marker/google-map-marker.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DateTimePickerComponent } from './form/form-control/date-time-picker/date-time-picker.component';
import { PexComponent } from './form/form-control/pex/pex.component';
import { CounterComponent } from './form/form-control/counter/counter.component';

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
  CardComponent,
  FilterTabsComponent,
  SliderRangeComponent,
  GoogleMapsComponent,
  GoogleMapMarkerComponent,
  SubscriptionComponent,
  MainScreenComponent,
  PexComponent,
  CounterComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,
  FormsModule, ReactiveFormsModule,
  SlickCarouselModule,

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

  NouisliderModule,
  NgxDaterangepickerMd.forRoot(),



  PipesModule,

  RouterModule.forRoot(routes)
];

@NgModule({
  declarations: [...COMPONENTS, MainScreenComponent, DateTimePickerComponent, PexComponent, CounterComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS,
    FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
