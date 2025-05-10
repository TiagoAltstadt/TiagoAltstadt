import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyTreeComponent } from './family-tree.component';

const routes: Routes = [{ path: '', component: FamilyTreeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FamilyTreeRoutingModule { }