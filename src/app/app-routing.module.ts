import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'experience',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/experience/experience.module').then((m) => m.ExperienceModule),
  },
  {
    path: '**',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
