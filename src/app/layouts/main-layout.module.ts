import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [MainLayoutComponent],
    imports: [RouterModule, AppRoutingModule, BrowserModule, ComponentsModule],
})
export class LayoutsModule { }