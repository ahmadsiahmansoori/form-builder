import { ActionForm } from "./Form"

export interface EventHandler<E = Event> {
  (event: E): void
}

export interface ResponseActionForm {
  status: number
  data?: string
  alert?: string
  errors?: string
}

export interface HttpCallEvent {
  action: ActionForm
  response: ResponseActionForm
}

export interface SetValueEvent {

}

export interface setItemEvent {

}

interface Event {
  onClick?: EventHandler<MouseEvent>
  onInput?: EventHandler<InputEvent>
  onChange?: EventHandler<Event>
  onFocus?: EventHandler<FocusEvent>
  onBlur?: EventHandler<FocusEvent>
  onKeydown?: EventHandler<KeyboardEvent>
  onKeyup?: EventHandler<KeyboardEvent>
  onMouseover?: EventHandler<MouseEvent>
  onMouseout?: EventHandler<MouseEvent>
}

