import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounce, debounceTime, distinctUntilChanged, filter, interval, map, startWith, switchMap, take, tap } from 'rxjs';

interface AutocompleteDataProvider<bindValue = string, result = any> {
  label: string
  bindLabel: string
  bindValue: bindValue
  query(params: any , ...option: any): Observable<result[]>
}


@Component({
  selector: 'autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit {


  public searchInput = new FormControl<string>('')


  @Output() event = new EventEmitter<string>()
  @Input() dataProvider!: AutocompleteDataProvider
  @Input() optionQuery = [];



  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(data => (data as string).toLocaleLowerCase().trim()),
      filter(value =>  value.length >= 1),
      filter(data => !this.options.find(x => data == x)),
      debounceTime(600),
      distinctUntilChanged(),
      map(value => this._filter(value || '')),
      // switchMap(data => this.dataProvider.query(data , this.optionQuery))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    console.log('ahmad');

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }




}
