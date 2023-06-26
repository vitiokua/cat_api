import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {CAT_LIST_STATE_DEFAULT, CatListStateModel} from "./cat-list.model";
import {CatService} from "../../services/cat.service";
import {PROGRESS_STATUSES} from "../../../shared/http.symbols";
import {CatList, CatListFail, CatListSuccess} from "./cat-list.action";

@State<CatListStateModel>({
  name: 'catList',
  defaults: CAT_LIST_STATE_DEFAULT
})
@Injectable()
export class CatListState implements NgxsOnInit {

  constructor(private service: CatService) {
  }

  @Selector()
  static catList(state: CatListStateModel): CatListStateModel['catList'] {
    return state.catList!;
  }


  @Action(CatList)
  catList(ctx: StateContext<CatListStateModel>, {breeds_ids}: CatList){
    ctx.patchState({
      loadCatListStatus: PROGRESS_STATUSES.IN_PROGRESS
    })

    this.service.getCats(breeds_ids).subscribe({
      next: catList => ctx.dispatch(new CatListSuccess(catList)),
      error: err => ctx.dispatch(new CatListFail(err)),
    });
  }

  @Action(CatListSuccess)
  catListSuccess(ctx: StateContext<CatListStateModel>, {catList}:CatListSuccess){
    ctx.patchState({
      catList:catList,
      loadCatListStatus: PROGRESS_STATUSES.SUCCESS
    })
  }

  @Action(CatListFail)
  catListFail(ctx: StateContext<CatListStateModel>, {error}:CatListFail){
    ctx.patchState({
      loadCatListStatus: PROGRESS_STATUSES.INTERRUPT
    })
  }




  ngxsOnInit(ctx: StateContext<CatListStateModel>) {
    ctx.patchState({
      loadCatListStatus: PROGRESS_STATUSES.NOT_INITIALIZE,
    });
  }

}
