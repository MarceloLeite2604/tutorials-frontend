import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";

/* Since SignInComponent has a page scope (it will not be used on another components), so there is not need to declare it on "export" attribute. */
@NgModule({
    declarations: [SignInComponent]
})
export class HomeModule {

}