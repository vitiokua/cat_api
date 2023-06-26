import {CatListStateModel} from "./cat-list.model";

export class CatList {
  static type = '[catList] CatList';
  constructor(public breeds_ids: string) {
  }

}

export class CatListSuccess {
  static type = '[catList] CatListSuccess';

  constructor(public catList: CatListStateModel['catList']) {
  }

}

export class CatListFail {
  static type = '[catList] CatListFail';
  constructor(public error: any) {
  }
}
