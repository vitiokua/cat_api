import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, debounceTime, map, Observable, startWith, Subscription} from 'rxjs';

@Component({
  selector: 'app-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss'],
})
export class SearchSelectorComponent implements OnInit, OnDestroy {

  @Input() placeholder = 'search';
  @Input() label = 'Select';
  @Output() selectedValue = new EventEmitter<any>();
  choicesLocal$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  choices$!: Observable<any[]>;
  viewFieldNameLocal = ['name'];
  valueFieldNameLocal = 'id';

  searchControl = new FormControl('');
  valueForm = new FormControl();

  readonly subscription = new Subscription();

  @Input() set valueFieldName(value: string) {
    this.valueFieldNameLocal = value;
  }

  @Input() set viewFieldName(values: string[]) {
    this.viewFieldNameLocal = values;
  }

  @Input() set choices(value: any[] | null) {
    if (value) {
      this.choicesLocal$.next(value);
    }
  }

  @Input() set defaultValue(value: any) {
    if (value) {
      this.valueForm.setValue(value, {emitEvent: false});
    }
  }


  ngOnInit() {
    this.subscription.add(
      this.searchControl.valueChanges
        .pipe(
          startWith(''),
          debounceTime(200),
        )
        .subscribe({
          next: value => this.choices$ = this.filter(value!),
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectValue(choiceElement: any) {
    this.selectedValue.next(choiceElement);
  }

  private filter(value: string): Observable<any[]> {
    return this.choicesLocal$.asObservable()
      .pipe(
        map(items => {
          return (items.map(item => item).filter(item => item[this.viewFieldNameLocal[0]].includes(value)));
        }),
      );
  }
}
