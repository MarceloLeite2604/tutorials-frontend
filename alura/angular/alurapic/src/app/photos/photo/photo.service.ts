import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

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
        return this.http.post(API + '/photos/upload', 
            formData, 
            {
                observe: 'events',
                reportProgress: true
            });
    }

    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments')
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post( API + '/photos/' + photoId + '/comments', {commentText});
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {
        return this.http
            .post(API + '/photos/' + photoId + '/like', {}, { observe: 'response'})
            .pipe(map(res => true ))
            /* "catchError" catches an error on current observable and can either return a new observable or throw an error. */
            .pipe(catchError( err => {
                if (err.status == '304') {
                    /* "of" creates a new observable with the specified value. */
                    return of(false)
                } else {
                    /* "throwError" creates a new observable with no values which immediately throws an error. */
                    return throwError(err); 
                }
            }));
    }
}