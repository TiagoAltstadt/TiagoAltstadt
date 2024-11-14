import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YomeComponent } from './yome.component';

const routes: Routes = [{ path: '', component: YomeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YomeRoutingModule { }