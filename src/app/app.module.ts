import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RadioComponent } from './radio/radio.component';
import { RecordsComponent } from './records/records.component';

import { HighchartsChartModule } from "highcharts-angular";
import { HeaderComponent } from './header/header.component';
import { SvgLoaderComponent } from './svg-loader/svg-loader.component';
import { ChartDescriptionComponent } from './chart-description/chart-description.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    DropdownComponent,
    RadioComponent,
    RecordsComponent,
    HeaderComponent,
    SvgLoaderComponent,
    ChartDescriptionComponent,
    HomepageComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
