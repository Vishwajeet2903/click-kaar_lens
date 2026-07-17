import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/lens/lens.routes').then((m) => m.lensRoutes) },
  { path: '**', redirectTo: '' }
];
