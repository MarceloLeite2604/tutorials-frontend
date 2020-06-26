import { NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { SignInComponent } from "./signin/signin.component";
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";
import { RouterModule } from "@angular/router";
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignupService } from './signup/signup.service';
/* Since SignInComponent has a page scope (it will not be used on another components), so there is not need to declare it on "export" attribute. */
@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
        HomeComponent 
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers: [
        SignupService
    ]
})
export class HomeModule { }
