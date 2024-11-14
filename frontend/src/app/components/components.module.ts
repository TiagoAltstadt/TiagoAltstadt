import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestComponent } from '../pages/test/test.component';
import { LoginComponent } from '../pages/login/login.component';


const components: any[] = [
    //Components
    HeaderComponent,
    ProjectCardComponent,
    //Pages
    HomeComponent,
    TestComponent,
    LoginComponent

];
const modules: any[] = [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    exports: [...components],
    providers: [],
})
export class ComponentsModule {
    constructor() { }
}