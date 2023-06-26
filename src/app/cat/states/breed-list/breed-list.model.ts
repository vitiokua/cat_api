import {PROGRESS_STATUSES} from "../../../shared/http.symbols";
import {BreedModel} from "../../cat.model";


export interface BreedListStateModel {
  breedList: BreedModel[];
  loadBreedListStatus: PROGRESS_STATUSES;
}

export const BREED_LIST_STATE_DEFAULT: BreedListStateModel = {
  breedList: [],
  loadBreedListStatus: PROGRESS_STATUSES.NOT_INITIALIZE,
}
