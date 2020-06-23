import { Directive, ElementRef, HostListener, Renderer, Input } from "@angular/core";

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';

    constructor(private el: ElementRef, private renderer: Renderer) {

    }

    @HostListener('mouseover')
    darkenOn() {
        /*
        At this point, it would be possibe to add the CSS property by manipulating the DOM element on "this.el.nativeElement", but, if you try to render the element on server-side, the DOM element will not be available. To avoid it, we will use a "Renderer" element to add the CSS style.
        The "setElementStyle" receives the element to be manipulated, the CSS property name and the CSS property value. 
        */
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}