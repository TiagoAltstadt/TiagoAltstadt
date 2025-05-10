import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyTreeRoutingModule } from './family-tree-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, FamilyTreeRoutingModule, ComponentsModule],
})
export class FamilyTreeModule { }