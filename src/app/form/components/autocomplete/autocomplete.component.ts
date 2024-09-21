import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Input as InputField} from '../../Interfaces/Input'
import { Validation } from '../../Interfaces/Validations';
import { Subscribable, Unsubscribable } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input({required: true}) input!: FormControl

  @


  public selectItem(item: any) {

    this.input.setValue(item.item_title, {emitEvent: false})
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

  }








}
