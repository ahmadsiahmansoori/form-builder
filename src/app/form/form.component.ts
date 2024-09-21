import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGenerator } from './FormGenerator';
import { data } from './data';
import { Field, InputType, InputSelect, InputAutocomplete, DivColField } from './form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public formGenerator: FormGenerator;
  readonly data = data
  constructor( private fb: FormBuilder, private httpClient: HttpClient) {
    this.formGenerator = new FormGenerator(this.fb,this.data, this.httpClient)
  }

  InputType = InputType

  submit() {
    if(this.data?.noValidation != true && this.formGenerator.formGroup.invalid) {
      console.log('form invalid', this.formGenerator.formGroup.value);
      return;
    }

    this.formGenerator.submit().subscribe(console.log);
  }

  onChange(field: Field, event: Event) {

    if(!field.events) {
      console.log(field, 'not event');
      return;
    }

    if(field.events.change) {
      return this.formGenerator.changeEventHandling(field.events.change, event)
    }

  }

  public selectConfig(config: any): InputSelect<any> {
    return config;
  }

  public autocomplete(config: any): InputAutocomplete<any> {
    return config;
  }


  getColClasses(field: Field): string {
    const col = field.col;
    return Object.keys(col).map(key => `col-${key}-${col[key as DivColField]}`).join(' ');
  }

  ngOnInit(): void {
    this.formGenerator.formGroup.valueChanges.subscribe(console.log)
  }
}
