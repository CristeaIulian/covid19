import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '@memobit/angular/directives/button';
import { PaginatorModule } from '@memobit/angular/components/paginator';
import { RadioModule } from '@memobit/angular/components/radio';
import { TagModule } from '@memobit/angular/components/tag';
import { FormFieldModule } from '@memobit/angular/components/form-field';
import { InputTextModule } from '@memobit/angular/components/input-text';
import { TextareaModule } from '@memobit/angular/components/textarea';
import { AccordionModule } from '@memobit/angular/components/accordion';

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

    ReactiveFormsModule,
    ButtonModule,
    PaginatorModule,
    RadioModule,
    TagModule,
    FormFieldModule,
    InputTextModule,
    TextareaModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
