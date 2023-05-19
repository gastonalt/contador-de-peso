import { NgModule } from '@angular/core';
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
import { EditPasoDialog } from './components/inicio/edit-peso-dialog/edit-paso.dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderStatusSectionComponent,
    InicioComponent,
    CtaFloatingButtonComponent,
    EditPasoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
