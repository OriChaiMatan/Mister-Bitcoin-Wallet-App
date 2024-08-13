import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailsComponent,
    StatisticPageComponent,
    ChartComponent,
    AppHeaderComponent,
    PageNotFoundComponent,
    ContactEditComponent,
    LoaderComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
