import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonModule } from '@angular/material/button';

// import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatChipsModule } from '@angular/material/chips';

import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatInputModule } from '@angular/material/input';

// import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatListModule } from '@angular/material/list';

// import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatRadioModule } from '@angular/material/radio';

// import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { ContactComponent } from './components/contact/contact.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [AppComponent, ContactComponent, GeneralInfoComponent, ReportsComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
