import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {CatList} from "../../states/cat-list/cat-list.action";
import {CatListState} from "../../states/cat-list/cat-list.state";
import {Observable} from "rxjs";
import {CatListStateModel} from "../../states/cat-list/cat-list.model";
import {BreedListState} from "../../states/breed-list/breed-list.state";
import {BreedListStateModel} from "../../states/breed-list/breed-list.model";
import {BreedList} from "../../states/breed-list/breed-list.action";
import {FindCatModel} from "../../../image-slider/types/findCat.interface";


@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements  OnInit{

  @Select(CatListState.catList) catList$!: Observable<CatListStateModel['catList']>;
  @Select(BreedListState.breedList) breedList$!: Observable<BreedListStateModel['breedList']>;


  slides: FindCatModel[]= [{url: ''}]

  constructor(private store: Store) {
  }

  ngOnInit(){
    this.store.dispatch(new CatList(''))
    this.store.dispatch(new BreedList())

      this.catList$.subscribe(currentCats => {
        this.slides = currentCats.map(cat => ({ url: cat.url }));
      });
  }
  selectedBreed(value: any){
    this.store.dispatch(new CatList(value))
  }






}
