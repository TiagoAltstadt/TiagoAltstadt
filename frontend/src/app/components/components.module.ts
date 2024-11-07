import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestComponent } from '../pages/test/test.component';


const components: any[] = [
    //Components
    HeaderComponent,
    ProjectCardComponent,
    //Pages
    HomeComponent,
    TestComponent

];
const modules: any[] = [
    RouterModule,
    CommonModule,
    FormsModule,
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