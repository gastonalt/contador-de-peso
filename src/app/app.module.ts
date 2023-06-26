import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/common/header/header.component';
import { MaterialModule } from './modules/material.module';
import { SubheaderStatusSectionComponent } from './components/common/subheader-status-section/subheader-status-section.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CtaFloatingButtonComponent } from './components/common/cta-floating-button/cta-floating-button.component';
import { EditPesoDialog } from './components/inicio/edit-peso-dialog/edit-peso.dialog';
import { DetailComponent } from './components/detail/detail.component';
import { states } from './state/app';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CompleteUrlInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { EditPasoByFechaDialog } from './components/detail/edit-peso-by-fecha-dialog/edit-peso-by-fecha.dialog';
import { ConfirmEliminarDialog } from './components/detail/confirm-eliminar-dialog/confirm-eliminar.dialog';
import { NewEjercicioDialog } from './components/common/cta-floating-button/new-ejercicio-dialog/new-ejercicio.dialog';
import { NewPesoDialog } from './components/common/cta-floating-button/new-peso-dialog/new-peso.dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderStatusSectionComponent,
    InicioComponent,
    CtaFloatingButtonComponent,
    EditPesoDialog,
    DetailComponent,
    EditPasoByFechaDialog,
    ConfirmEliminarDialog,
    NewEjercicioDialog,
    NewPesoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(states),
    NgxsStoragePluginModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: CompleteUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
