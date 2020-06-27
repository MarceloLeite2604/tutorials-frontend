import { NgModule } from "@angular/core";
import { DarkenOnHoverDirective } from "./darken-on-hover.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DarkenOnHoverDirective],
    exports: [DarkenOnHoverDirective],
    imports: [CommonModule]
})
export class DarkenOnHoverModule {

}