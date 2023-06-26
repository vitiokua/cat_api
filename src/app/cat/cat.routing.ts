import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatListComponent} from "./components/cat-list/cat-list.component";

const routes: Routes = [
  {
    path: '',
    component: CatListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatRouteRoutes { }
