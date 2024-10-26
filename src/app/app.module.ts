import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './admin-component/carousel/carousel.component';
import { ProfileComponent } from './admin-component/profile/profile.component';
import { MenuComponent } from './admin-component/menu/menu.component';
import { RoleComponent } from './admin-component/role/role.component';
import { TestimonialsComponent } from './admin-component/testimonials/testimonials.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './admin-component/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule]
})
export class AppModule { }
