import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YomeRoutingModule } from './yome-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, YomeRoutingModule, ComponentsModule],
})
export class YomeModule { }