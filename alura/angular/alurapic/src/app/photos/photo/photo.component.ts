import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
    /* It is a good practice to use a project prefix on component names (alurapic -> ap). */
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
    styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

    private _url;

    @Input() description = '';
    
    /* @Input decorator makes url and description receive values, making them inbound properties. */
    /* @Input() url = ''; */
    @Input() set url(url: string) {
        this._url = url;
    }

    get url() {
        if (!this._url.startsWith('data')) {
            return CLOUD + this._url;
        }
        return this._url;
    }
}