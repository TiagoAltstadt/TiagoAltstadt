import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/main-layout.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BioComponent } from './pages/bio/bio.component';

@NgModule({
  declarations: [
    AppComponent,
    ExperienceComponent,
    NotFoundComponent,
    ContactComponent,
    BioComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LayoutsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
