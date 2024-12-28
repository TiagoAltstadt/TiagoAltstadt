import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookRoutingModule } from './cook-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, CookRoutingModule, ComponentsModule],
})
export class CookModule { }