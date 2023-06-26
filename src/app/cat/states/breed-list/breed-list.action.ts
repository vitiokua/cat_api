import {BreedListStateModel} from "./breed-list.model";

export class BreedList {
  static type = '[breedList] BreedList';
  constructor() {
  }

}

export class BreedListSuccess {
  static type = '[breedList] BreedListSuccess';

  constructor(public breedList: BreedListStateModel['breedList']) {
  }

}

export class BreedListFail {
  static type = '[breedList] BreedListFail';
  constructor(public error: any) {
  }
}
