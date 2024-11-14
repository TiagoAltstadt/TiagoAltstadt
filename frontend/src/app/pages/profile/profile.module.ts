import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ProfileRoutingModule, ComponentsModule],
})
export class ProfileModule { }