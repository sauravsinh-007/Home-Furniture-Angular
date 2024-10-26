import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { CarouselComponent } from 'src/app/admin-component/carousel/carousel.component';
import { MenuComponent } from 'src/app/admin-component/menu/menu.component';
import { ProfileComponent } from 'src/app/admin-component/profile/profile.component';
import { RoleComponent } from 'src/app/admin-component/role/role.component';
import { TestimonialsComponent } from 'src/app/admin-component/testimonials/testimonials.component';
import { ContentComponent } from 'src/app/admin-component/content/content.component';
import { DashboardComponent } from 'src/app/admin-component/dashboard/dashboard.component';
import { authGuard } from 'src/app/auth/auth.guard';
import { CategoryComponent } from 'src/app/admin-component/category/category.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'user', component: ProfileComponent },
      { path: 'role', component: RoleComponent },
      { path: 'carousel', component: CarouselComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'content', component: ContentComponent },
      { path: 'category', component: CategoryComponent },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  },
  // {

  //   path: 'carousel',
  //   component: CarouselComponent
  // },
  // {
  //   path: 'menu',
  //   component: MenuComponent
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent
  // },
  // {
  //   path: 'role',
  //   component: RoleComponent
  // },
  // {
  //   path: 'setting',
  //   component: SettingComponent
  // },
  // {
  //   path: 'testimonials',
  //   component: TestimonialsComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
