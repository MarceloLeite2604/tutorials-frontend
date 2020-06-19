import { Component, Input } from "@angular/core";

@Component({
    /* It is a good practice to use a project prefix on component names (alurapic -> ap). */
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
    styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
    
    /* @Input decorator makes url and description receive values, making them inbound properties. */
    @Input() url = '';
    @Input() description = '';
}