import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselComponent } from 'src/app/admin-component/carousel/carousel.component';
import { MenuComponent } from 'src/app/admin-component/menu/menu.component';
import { ProfileComponent } from 'src/app/admin-component/profile/profile.component';
import { RoleComponent } from 'src/app/admin-component/role/role.component';
import { TestimonialsComponent } from 'src/app/admin-component/testimonials/testimonials.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from 'src/app/admin-component/content/content.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CarouselComponent,
    MenuComponent,
    ProfileComponent,
    RoleComponent,
    TestimonialsComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  exports: [ReactiveFormsModule,
    FormsModule]
})
export class AdminLayoutModule { }
