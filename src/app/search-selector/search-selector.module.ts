import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchSelectorComponent } from './components/search-selector/search-selector.component';


@NgModule({
  declarations: [SearchSelectorComponent],
  exports: [SearchSelectorComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
})
export class SearchSelectorModule {}
