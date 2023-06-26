import {PROGRESS_STATUSES} from "../../../shared/http.symbols";
import {CatModel} from "../../cat.model";

export interface CatListStateModel {
  catList: CatModel[];
  loadCatListStatus: PROGRESS_STATUSES;
}

export const CAT_LIST_STATE_DEFAULT: CatListStateModel = {
  catList: [],
  loadCatListStatus: PROGRESS_STATUSES.NOT_INITIALIZE,
}
