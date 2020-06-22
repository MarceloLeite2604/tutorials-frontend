import { NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { SignInComponent } from "./signin/signin.component";
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";
/* Since SignInComponent has a page scope (it will not be used on another components), so there is not need to declare it on "export" attribute. */
@NgModule({
    declarations: [ SignInComponent ],
    imports: [ 
        CommonModule, 
        ReactiveFormsModule,
        VMessageModule ]
})
export class HomeModule { }
