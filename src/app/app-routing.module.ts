import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { BillingComponent } from './billing/billing.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'app',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home/:postId', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'app', component: AppComponent},
  {path: 'loader', component: LoaderComponent},
  // {path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard]},
  // {path: 'student', component: StudentDetailsComponent, canActivate: [AuthGuard]},
  {path: '', component: LandingPageComponent, canActivate: [AuthGuard],
  children: [{path: 'student', component: StudentDetailsComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard]},
  {path: 'oldregistration', component: RegistrationComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'billing', component: BillingComponent, canActivate: [AuthGuard]},
]},
{path: '**', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

