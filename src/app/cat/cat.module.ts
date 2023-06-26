import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CatListState} from "./states/cat-list/cat-list.state";
import {NgxsModule} from "@ngxs/store";
import { CatListComponent } from './components/cat-list/cat-list.component';
import {CatRouteRoutes} from "./cat.routing";
import {CatService} from "./services/cat.service";
import {SharedModule} from "../shared/shared.module";
import {BreedListState} from "./states/breed-list/breed-list.state";
import {SearchSelectorModule} from "../search-selector/search-selector.module";
import {ImageSliderModule} from "../image-slider/image-slider.module";



@NgModule({
  declarations: [
    CatListComponent
  ],
  imports: [
    CommonModule,
    CatRouteRoutes,
    SharedModule,
    NgxsModule.forFeature([
      CatListState,
      BreedListState
    ]),
    NgOptimizedImage,
    SearchSelectorModule,
    SharedModule,
    ImageSliderModule
  ],
  providers: [CatService]
})
export class CatModule { }
