import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookComponent } from './cook.component';

const routes: Routes = [{ path: '', component: CookComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CookRoutingModule { }