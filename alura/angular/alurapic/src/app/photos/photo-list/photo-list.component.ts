import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private service: PhotoService) {
  }
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
    this.debounce
    /* The debounce design pattern waits a specificed amount of time before execute a command and resets the timer everytime a new input is received (check the event monitoring on "photo-list.component.html" file). In this case, we'll wait 300 ms before redefining the filter, so the value won't be updated several times before the user completes its input. */
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }
  
  ngOnDestroy(): void {
    /* To prevent memory leaking, we have to finish the debounce subscription. In subscriptions, we have two ways of doing that: Either the method "complete" must be executed when the message has been manipulated or the method "unsubscribe" must be executed when we have finished our subscription. The formedr cannot be done since we do not know when the user will stop inputting data, so the later will me executed when the PhotoListComponent is destroyed. */
    this.debounce.unsubscribe();
  }

  load() {
    this.service.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(photos => {
      /* 
      The following command will not trigger the photos component update, since "this.photos" value has not been updated, but its content.
      this.photos.push(...photos);
      For Angular detect the value update, the value must be modified as follows:
      */
     this.photos = this.photos.concat(photos);
      if (!photos.length) this.hasMore = false;
    })
  }
}
