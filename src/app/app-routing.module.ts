import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
// import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{ path: 'admin', loadChildren: () => import('./core/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule), canActivate: [authGuard] },
{
  path: "login",
  component: LoginComponent
},
{ path: '', redirectTo: 'admin', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
