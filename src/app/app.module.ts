import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeService } from './home/home.service';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { PhotoPreviewComponent } from './registration/phot-preview-dialog';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { BillingComponent } from './billing/billing.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { EditRegistrationDialogComponent } from './student-details/edit-student-dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ErrorInterceptor} from './error-interceptor';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoaderComponent,
    RegistrationComponent,
    PhotoPreviewComponent,
    EditRegistrationDialogComponent,
    LoginComponent,
    SignupComponent,
    BillingComponent,
    StudentDetailsComponent,
    SnackBarComponent,
    LandingPageComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSlideToggleModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
