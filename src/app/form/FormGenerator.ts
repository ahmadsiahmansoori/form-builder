import { Input } from '@angular/core';
import { Observable, config, map } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { ApiCallEvent, EventChange, EventInput, Field, Form, FormControlAttributes, InputSelect, InputType, SetValueEvent, ValidationMapping } from "./form";
import { HttpClient, HttpParams } from '@angular/common/http';


export enum KeyValueInput {

}



export class FormGenerator {


  private builder!: FormBuilder;
  private form!: Form
  private _formGroup!: FormGroup;
  private httpClient: HttpClient;

  constructor(formBuilder: FormBuilder, form: Form , httpClient: HttpClient) {
    this.form = form;
    this.builder = formBuilder;
    this._formGroup = this.builder.group({})
    this.createControllers()
    this.httpClient = httpClient;
  }


  public submit(): Observable<any> {
    if(this.form.action.method == 'post') {
      return this.httpClient.post(this.form.action.url, {})
    } else {
      return this.httpClient.get(this.form.action.url)
    }
  }



  private createControllers(): void {
    this.deepObject(this.form).fields.forEach((item: Field) => {
      let typeInput: string = item.input.name
      if(typeInput != InputType.button && typeInput != InputType.submit) {
        let value = (item.input.config as any)?.defaultValue
        this.createControllerWithName(item.name, item.rules ? item.rules : {} , value || null)
      }
    })
  }

  public controler(name: string): AbstractControl  {
    return this.formGroup.controls[name]
  }

  public get formGroup(): FormGroup {
    return this._formGroup
  }

  private createControllerWithName(name: string, validations: ValidationMapping| Object  , defaultValue: any = null) {
    this._formGroup.addControl(name,this.builder.control(defaultValue, this.generateValidations(validations)))
  }



  public changeEventHandling(events: EventChange[], e: any) {

    events = this.deepObject(events)
    events.forEach(event => {
      switch(event.type) {
        case 'API':

          const configEvent = (event.config as ApiCallEvent)

          for(let q in configEvent?.queryParams) {
            (configEvent.queryParams[q] as any) = this.parseStringForm(null, configEvent?.queryParams[q]);
          }
          const httpParams = new HttpParams().appendAll(configEvent?.queryParams as any)
          this.httpClient.get(configEvent.url,{params: httpParams}).subscribe((res: any) => {

            if(configEvent.response?.setItems) {
              (this.form.fields.find(item => item.name == configEvent.response?.setItems)?.input.config as InputSelect).items = res
            }
          })

          break;
        case "setValue":
          const config = (event.config as SetValueEvent)
          this.formGroup.get(config.input)?.setValue(this.parseStringForm(null, config.value))
          break;
        default:

          break;
      }
    })
  }

  /**
   *
   * @param validations
   * @returns ValidatorFn[] rules
   */
  private generateValidations(validations: ValidationMapping | object ): ValidatorFn[]  {
    const validationFns: ValidatorFn[] = [];
    const validationMapping = validations as ValidationMapping;


    if(validationMapping.required) {
      validationFns.push(Validators.required)
    }

    if(validationMapping.minLength) {
      validationFns.push(Validators.minLength(validationMapping.minLength.value))
    }

    if(validationMapping.maxLength) {
      validationFns.push(Validators.maxLength(validationMapping.maxLength.value))
    }

    if(validationMapping.email) {
      validationFns.push(Validators.email)
    }

    if(validationMapping.pattern) {
      validationFns.push(Validators.pattern(validationMapping.pattern.value))
    }

    if(validationMapping.min) {
      validationFns.push(Validators.min(validationMapping.min.value))
    }

    if(validationMapping.max) {
      validationFns.push(Validators.max(validationMapping.max.value))
    }

    return validationFns;
  }

  /**
   *
   * @param thisArg
   * @param text
   * @returns keyof FormControlAttributes | string
   */
  public parseStringForm(thisArg: this|null , text: string): keyof FormControlAttributes | string {

    if(thisArg == null) {
      thisArg = this
    }


    const parts = text.split(':');

    if(parts[0] != 'input' || parts.length != 3) {
      return text
    }

    const inputName = parts[1];
    const inputAttr = parts[2] as keyof FormControlAttributes


    const control = thisArg?._formGroup?.get(inputName);


    if(!control) {
      return text;
    }

    if (inputAttr in control) {
      return (control as FormControlAttributes)[inputAttr]
    }

    return text;
  }



  /**
   *
   *
   * @param {string} text
   * @param {*} item
   * @return {string}
   */
  public static parseStringItem(text: string , item: any): string {
    const pattern_item = /\$item\.([a-zA-Z0-9_]+)/g;

    return text.replace(pattern_item, (match, property) => {
      if (property in item) {
        return item[property];
      }

      return match;

    })
  }



  /**
   *
   * @param input
   * @returns new reference input
   */
  private deepObject(input: any): any {

    if (input === null || typeof input !== 'object') {
      return input;
    }

    if(Array.isArray(input)) {
      return input.map(data => this.deepObject(data))
    }

    const copy: any = {};

    for(let item in input) {
      copy[item] = this.deepObject(input[item])
    }

    return copy;
  }

}
