import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler.component';
import { GlobalErrorComponent } from './global-error/global-error.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    GlobalErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }]
})
export class ErrorsModule { }
