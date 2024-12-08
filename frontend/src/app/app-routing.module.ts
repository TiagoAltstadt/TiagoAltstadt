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
      import('./pages/experience/experience.module').then(
        (m) => m.ExperienceModule
      ),
  },
  {
    path: 'bio',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/bio/bio.module').then((m) => m.BioModule),
  },
  {
    path: 'dev',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/dev/dev.module').then((m) => m.DevModule),
  },
  {
    path: 'test',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/test/test.module').then((m) => m.TestModule),
  },
  {
    path: 'yome',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/yome/yome.module').then((m) => m.YomeModule),
  },
  {
    path: 'profile',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'login',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'contact',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: '**',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
