import { Routes } from '@angular/router';
import { LensShellComponent } from './lens-shell.component';
import { HomePageComponent } from './pages/home-page.component';
import { CategoryListPageComponent } from './pages/category-list-page.component';
import { CategoryDetailPageComponent } from './pages/category-detail-page.component';
import { IdeasPageComponent } from './pages/ideas-page.component';
import { BlogListPageComponent } from './pages/blog-list-page.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page.component';
import { ContactPageComponent } from './pages/contact-page.component';
import { CrewDashboardPageComponent } from './pages/crew-dashboard-page.component';
import { CrewRegisterPageComponent } from './pages/crew-register-page.component';
import { JoinPageComponent } from './pages/join-page.component';
import { LoginPageComponent } from './pages/login-page.component';
import { ProjectCoordinatorDashboardPageComponent } from './pages/project-coordinator-dashboard-page.component';
import { ProjectManagerDashboardPageComponent } from './pages/project-manager-dashboard-page.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { ServicesPageComponent } from './pages/services-page.component';
import { SimplePageComponent } from './pages/simple-page.component';
import { SalesDashboardPageComponent } from './pages/sales-dashboard-page.component';
import { SuperAdminDashboardPageComponent } from './pages/super-admin-dashboard-page.component';

export const lensRoutes: Routes = [
  {
    path: '',
    component: LensShellComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'occasions', component: CategoryListPageComponent, data: { group: 'occasion' } },
      { path: 'occasions/:slug', component: CategoryDetailPageComponent, data: { group: 'occasion' } },
      { path: 'business', component: CategoryListPageComponent, data: { group: 'business' } },
      { path: 'business/:slug', component: CategoryDetailPageComponent, data: { group: 'business' } },
      { path: 'ideas', component: IdeasPageComponent },
      { path: 'blog', component: BlogListPageComponent },
      { path: 'blog/:slug', component: BlogDetailPageComponent },
      { path: 'about', component: SimplePageComponent, data: { page: 'about' } },
      { path: 'contact', component: ContactPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'crew-register', component: CrewRegisterPageComponent },
      { path: 'super-admin', component: SuperAdminDashboardPageComponent },
      { path: 'sales-dashboard', component: SalesDashboardPageComponent },
      { path: 'project-manager-dashboard', component: ProjectManagerDashboardPageComponent },
      { path: 'project-coordinator-dashboard', component: ProjectCoordinatorDashboardPageComponent },
      { path: 'crew-dashboard', component: CrewDashboardPageComponent },
      { path: 'partners', component: JoinPageComponent, data: { role: 'partner' } },
      { path: 'join/photographer', component: JoinPageComponent, data: { role: 'photographer' } },
      { path: 'join/editor', component: JoinPageComponent, data: { role: 'editor' } },
      { path: 'join/project-coordinator', component: JoinPageComponent, data: { role: 'coordinator' } },
      { path: 'legal/:slug', component: SimplePageComponent },
      { path: '**', component: SimplePageComponent, data: { page: 'not-found' } }
    ]
  }
];
