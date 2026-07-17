import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'lens', pathMatch: 'full', redirectTo: 'lens' },
  { path: 'lens', loadChildren: () => import('./features/lens/lens.routes').then((m) => m.lensRoutes) },
  { path: '**', redirectTo: 'lens' }
];
