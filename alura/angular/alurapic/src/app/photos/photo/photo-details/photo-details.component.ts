import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute, 
        private photoService: PhotoService, 
        private router: Router,
        private alertService: AlertService,
        private userService: UserService) {}

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(
            () => {}, 
            err => {
                console.log(err);
                this.router.navigate(['not-found']);
            });
    }

    remove() {
        this.photoService.removePhoto(this.photoId).subscribe(
            () => {
                this.alertService.success("Photo removed", true);
                /* ReplaceUrl property will remove current path from navigation history and replace it by the one being navigated. This will prevent user to navigate to an invalid route (deleted photo) by clicking "back" button on browser. */
                this.router.navigate(['/users', this.userService.getUserName()], {replaceUrl: true})
            }, 
            err => {
                console.log(err);
                this.alertService.warning("Could not delete the photo.", true)
            }
        );
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if (liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            },
            err => {
                console.log(err.message);
                alert('Could not like photo');
            });
    }
}