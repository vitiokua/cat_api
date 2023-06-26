import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-search-input',
  templateUrl: './select-search-input.component.html',
  styleUrls: ['./select-search-input.component.scss'],
})
export class SelectSearchInputComponent implements OnChanges, OnInit {
  @Input() label = '';
  @Input() data?: any[];
  @Input() selectedIdInput?: number;
  @Output() selectedOutput = new EventEmitter();
  @Input() clear = false;

  formControlSearchNGX = new FormControl('');
  formControlSearch = new FormControl('');

  public filteredElements$: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.formControlSearchNGX.valueChanges.subscribe((search) => {
      this.filterMediator();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterMediator();
    this.setInitialValue();
    if (this.clear) {
      this.formControlSearch.setValue(null);
      return;
    }
    if (this.data) {
      this.formControlSearch.setValue(
        this.data.find((f) => f.id === this.selectedIdInput)?.id
      );
    }
  }

  protected setInitialValue() {
    this.filteredElements$
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {});
  }

  protected filterMediator() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.formControlSearchNGX.value;
    if (!search) {
      this.filteredElements$.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredElements$.next(
      this.data.filter((v) => v.name.toLowerCase().indexOf(search) > -1)
    );
  }

  select(mediator: number | null) {
    this.selectedOutput.emit(mediator);
  }
}
