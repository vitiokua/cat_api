import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  BREED_LIST_STATE_DEFAULT,
  BreedListStateModel
} from "./breed-list.model";
import {CatService} from "../../services/cat.service";
import {PROGRESS_STATUSES} from "../../../shared/http.symbols";
import {BreedList, BreedListFail, BreedListSuccess} from "./breed-list.action";

@State<BreedListStateModel>({
  name: 'breedList',
  defaults: BREED_LIST_STATE_DEFAULT
})
@Injectable()
export class BreedListState implements NgxsOnInit {

  constructor(private service: CatService) {}

  @Selector()
  static breedList(state: BreedListStateModel): BreedListStateModel['breedList'] {
    return state.breedList!;
  }


  @Action(BreedList)
  breedList(ctx: StateContext<BreedListStateModel>){
    ctx.patchState({
      loadBreedListStatus: PROGRESS_STATUSES.IN_PROGRESS
    })

    this.service.getBreeds().subscribe({
      next: breedList => ctx.dispatch(new BreedListSuccess(breedList)),
      error: err => ctx.dispatch(new BreedListFail(err)),
    });
  }

  @Action(BreedListSuccess)
  breedListSuccess(ctx: StateContext<BreedListStateModel>, {breedList}:BreedListSuccess){
    ctx.patchState({
      breedList:breedList,
      loadBreedListStatus: PROGRESS_STATUSES.SUCCESS
    })
  }

  @Action(BreedListFail)
  breedListFail(ctx: StateContext<BreedListStateModel>, {error}:BreedListFail){
    ctx.patchState({
      loadBreedListStatus: PROGRESS_STATUSES.INTERRUPT
    })
  }




  ngxsOnInit(ctx: StateContext<BreedListStateModel>) {
    ctx.patchState({
      loadBreedListStatus: PROGRESS_STATUSES.NOT_INITIALIZE,
    });
  }

}
