import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {

        /*
            The following code works for components created or loaded dynamically by Angular (most cases), but for components static component (like header components), this will not work. To solve it, we'll have to retrieve current CSS display value from the object and subscribe on "user" observable. When a value is emmited through subscriber, the method will check if a user exists. If positive, then it will keep its original CSS display value. If it is a null value (user is logged out), then it will put "none" in CSS display attribute.
        if (!this.userService.isLogged()) {
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
        }
        */
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if (user) {
                this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
            } else {
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
                
            }
        })

        
        
    }
}