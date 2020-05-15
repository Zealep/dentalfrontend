import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { GuardService } from './services/guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import es from '@angular/common/locales/es';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
  ],
  providers: [GuardService,
    { provide: LOCALE_ID, useValue: "es-ES"},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
