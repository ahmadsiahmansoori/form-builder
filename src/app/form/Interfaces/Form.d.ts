import { Input } from "./Input"

export enum MethodForm {
  GET = 'GET',
  POST = 'POST'
}

export interface ActionForm {
  url: string
  method: MethodForm
  queryParam?: { [k: string]: string }
  header?: { [k: string]: string }
  body?: { [k: string]: string }
  loading?: boolean
  noValidation?: boolean
}


export interface Form {
  action: ActionForm
  fields: Input[]
  event?: any
}
