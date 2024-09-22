import { AbstractControl, FormGroup } from "@angular/forms";

parsertext: (text: string, item: any): string => {
  const pattern_item = /\$item\.([a-zA-Z0-9_]+)/g;
  return text.replace(pattern_item, (_, prop) => {
    return prop in item ? item[prop] : 'unknown';
  });
}

parserInput: (thisArg: any, text: string): any => {
  if(!(thisArg?.form instanceof FormGroup)) {
    return 'unknown';
  }


  const params = text.split(':');
  if(params[0] !== '$input' && params.length != 3) {
    return 'unknown';
  }

  let name_control = params[1];
  let event_control = params[2];

  const control: AbstractControl = thisArg.form.get(name_control)

  if(!control) {
    return 'unknown';
  }

  if(event_control in control) {
    return (control as any)[event_control];
  }

  return 'unknown';
}
