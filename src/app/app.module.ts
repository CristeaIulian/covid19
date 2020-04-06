import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { ContactComponent } from './components/contact/contact.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ReportsComponent } from './components/reports/reports.component';

const appRoutes: Routes = [
  { path: '', component: GeneralInfoComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'contact', component: ContactComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    GeneralInfoComponent,
    ReportsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
