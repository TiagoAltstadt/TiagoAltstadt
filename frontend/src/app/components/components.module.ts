import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestComponent } from '../pages/test/test.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { BioComponent } from '../pages/bio/bio.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { ExperienceComponent } from '../pages/experience/experience.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { YomeComponent } from '../pages/yome/yome.component';
import { DevComponent } from '../pages/dev/dev.component';
import { RegisterComponent } from '../pages/register/register.component';
import { CookComponent } from '../pages/cook/cook.component';
import { ShoppingListComponent } from '../pages/shopping-list/shopping-list.component';
import { FamilyTreeComponent } from '../pages/family-tree/family-tree.component';


const components: any[] = [
  //Components
  HeaderComponent,
  ProjectCardComponent,
  //Pages
  YomeComponent,
  BioComponent,
  ContactComponent,
  FamilyTreeComponent,
  CookComponent,
  DevComponent,
  ShoppingListComponent,
  ExperienceComponent,
  RegisterComponent,
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ProfileComponent,
  TestComponent,
];
const modules: any[] = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...components],
  providers: [],
})
export class ComponentsModule {
  constructor() {}
}
