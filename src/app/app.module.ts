import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { TaskTrendline } from './task-trendline/task-trendline.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskTrendline
  ],
  imports: [
    BrowserModule,
    GoogleChartsModule,
    MatCardModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
