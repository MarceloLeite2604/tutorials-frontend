import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');

    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            /* Observation: When a variable has the same name as a Java object field, it is not necessary to write its name for attribution (The "{params}" object). */
            .get<Photo[]>(API + '/' + userName + '/photos', {params} );
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.http.post(API + '/photos/upload', formData);
    }
}