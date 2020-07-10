import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
