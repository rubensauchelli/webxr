import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CubeComponent} from './cube/cube.component';
import {AugmentedRealityComponent} from './augmented-reality/augmented-reality.component';

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: '', component: AugmentedRealityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

