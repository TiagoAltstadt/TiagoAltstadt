import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ContactRoutingModule, ComponentsModule],
})
export class ContactModule { }