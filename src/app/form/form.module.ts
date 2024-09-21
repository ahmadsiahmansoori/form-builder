import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { SharingModule } from '../sharing/sharing.module';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SelectComponent } from './components/select/select.component';
import { TextComponent } from './components/text/text.component';


@NgModule({
  declarations: [
    FormComponent,
    AutocompleteComponent,
    SelectComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharingModule
  ]
})
export class FormModule { }
