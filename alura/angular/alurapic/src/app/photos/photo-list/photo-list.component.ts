import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  /* debounce: Subject<string> = new Subject<string>(); */
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private service: PhotoService) {
  }
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
  }

  load() {
    this.service.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(photos => {
      this.filter = '';
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
