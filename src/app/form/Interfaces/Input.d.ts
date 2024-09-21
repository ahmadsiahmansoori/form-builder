import { Validation } from "./Validations"
import { Event } from "./Event"

export interface TextareaInput {
  defaultValue?: any
  placeholder?: string
  classes?: string
  name?: string
  id?: string
  disabled?: boolean
}

export interface TextInput {
  defaultValue?: any
  placeholder?: string
  classes?: string
  name?: string
  id?: string
  disabled?: boolean
}

export interface SelectInput<I = any> {
  items: I[]
  defaultValue?: any
  bindLabel: string
  bindValue?: any
  placeholder?: string
  classes?: string
  name?: string
  id?: string
  disabled?: boolean
  clearable?: boolean
}

export interface AutocompleteInput<I = any> {
  items: I[]
  defaultValue?: any
  bindLabel: string
  bindValue?: any
  minChars?: number
  debounceTime?: number
  placeholder?: string
  classes?: string
  name?: string
  id?: string
  disabled?: boolean
  clearable?: boolean
}

export interface SubmitInput {
  disabled?: boolean
  classes?: string
  value: string
}


export interface ButtonInput {
  disabled?: boolean
  classes?: string
  value: string
}

export type TypeInput = {
  text: TextInput
  select: SelectInput
  autocomplete: AutocompleteInput
  button: ButtonInput
  submit: SubmitInput
}

export interface Input<V extends keyof Validation = keyof Validation,  T extends keyof TypeInput = keyof TypeInput> {
  name: T,
  options: TypeInput[T]
  validations?: {[K in V]: Validation[K]}
  events?: Event
  col: {[k: string]: string}
}


