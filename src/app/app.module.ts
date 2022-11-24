import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterNowComponent } from './dialogs/register-now/register-now.component';
import { MaterialModule } from './shared/angularMaterialModule/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationModalComponent } from './dialogs/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ApplyNowComponent } from './dialogs/apply-now/apply-now.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterNowComponent,
    ConfirmationModalComponent,
    ChangePasswordComponent,
    ApplyNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatDialogModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
