import { OnInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PhotoService } from '../../photo.service';
import { PhotoComment } from '../../photo-comment';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {


    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        /*
        Does not solve the comment area update.
        this.photoService
            .addComment(this.photoId, comment)
            .subscribe(() => {
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso.');
            });
        */

        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso.');
            }));
    }

}