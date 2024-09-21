import { Observable } from "rxjs";

export interface RequiredValidation {
  message?: string;
}

export interface MinValidation {
  value: number;
  message?: string;
}

export interface MaxValidation {
  value: number;
  message?: string;
}

export interface MinLengthValidation {
  value: number;
  message?: string;
}

export interface MaxLengthValidation {
  value: number;
  message?: string;
}

export interface EmailValidation {
  message?: string;
}

export interface PatternValidation {
  value: string | RegExp
  message?: string;
}

export type ValidationMapping = {
  required: RequiredValidation;
  minLength: MinLengthValidation;
  maxLength: MaxLengthValidation;
  max: MaxValidation;
  min: MinValidation;
  email: EmailValidation;
  pattern: PatternValidation;
};

export interface InputText {
  defaultValue?: string,
  classes?: string,
  name?: string,
  id?: string,
  pattern?: string,
  title?: string,
  placeholder?: string
}

export interface InputSelect<I = any>{
  items: I[],
  defaultValue?: any
  bindLabel: string,
  bindItem?: any
  classes?: string,
  name?: string,
  id?: string,
  pattern?: string,
  title?: string,
  placeholder?: string
  parseBindLabel?: (item: I) => string
}

export interface InputAutocomplete<I = any> {

  items: I[]; // Array of items for autocomplete suggestions
  defaultValue?: any; // Default selected value
  bindLabel: string; // The default property to display (if no custom function is provided)
  bindValue?: any; // Optional property to bind value to each item
  minChars?: number; // Minimum characters to start showing suggestions
  debounceTime?: number; // Time in milliseconds to delay the search (useful for throttling)
  placeholder?: string; // Placeholder text for the input
  classes?: string; // Additional CSS classes
  name?: string; // Name of the input field
  id?: string; // HTML id for the input field
  disabled?: boolean; // Disable the input field
  clearable?: boolean; // Whether the autocomplete input is clearable

}


export interface InputTextarea {
  defaultValue?: string,
  classes?: string,
  name?: string,
  id?: string,
  pattern?: string,
  title?: string,
  placeholder?: string
}


export interface BSubmit{
  label: string,
  classes?: string,
}


export enum InputType {
  text = 'text',
  textarea = 'textarea',
  select = 'select',
  authocomplete = 'authocomplete',
  button = 'button',
  submit = 'submit'
}

export enum DivColField {
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export enum DivColFildValue {
  col1 = '1',
  col2 = '2',
  col3 = '3',
  col4 = '4',
  col5 = '5',
  col6 = '6',
  col7 = '7',
  col8 = '8',
  col9 = '9',
  col10 = '10',
  col11 = '11',
  col12 = '12',
}



export type FieldType =
  {name: InputType.text, config?: InputText} |
  {name: InputType.textarea, config?: InputTextarea}|
  {name: InputType.select, config: InputSelect} |
  {name: InputType.submit, config: BSubmit} |
  {name: InputType.authocomplete, config: InputAutocomplete}


export interface ApiCallResponse {
  map?: string
  setItems?: string,
  setDefaultValue?: string
}

export interface ApiCallEvent {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  queryParams?: {[k: string]: string},
  body?: {[k: string]: string},
  loading?: boolean
  response?: ApiCallResponse
}

export interface BindValueEvent {

}

export interface SetValueEvent {
  input: string
  value: string
}

export type EventChangeType = {
  API: ApiCallEvent,
  setValue: SetValueEvent,
}

export interface EventChange<T extends keyof EventChangeType = keyof EventChangeType> {
  type: T,
  config?: EventChangeType[T]
}


export type EventInput = {
  change: EventChange[]
}


export interface Action  {
  url: string
  method: string
}

export interface Field<V extends keyof ValidationMapping = keyof ValidationMapping, E extends keyof EventInput = keyof EventInput> {
  label: string,
  name: string,
  input: FieldType,
  disabled?: boolean,
  col: {[key in DivColField]?: DivColFildValue}
  rules?: {[K in V]?: ValidationMapping[K]};
  events?: {[K in E]?: EventInput[K]}
}

export interface Form {
  action: Action,
  noValidation?: boolean,
  loading?: boolean,
  fields: Field[]
}

export interface FormControlAttributes {
  value: any;
  valid: boolean;
  invalid: boolean;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  valueChanges: Observable<any>
  [key: string]: any;
}
