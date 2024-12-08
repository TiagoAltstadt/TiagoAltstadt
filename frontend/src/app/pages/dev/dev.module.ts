import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevRoutingModule } from './dev-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, DevRoutingModule, ComponentsModule],
})
export class DevModule { }