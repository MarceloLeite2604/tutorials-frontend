import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from "@angular/core";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() onTyping = new EventEmitter<string>();
    @Input() value = '';
    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        this.debounce
        // The debounce design pattern waits a specificed amount of time before execute a command and resets the timer everytime a new input is received (check the event monitoring on "photo-list.component.html" file). In this case, we'll wait 300 ms before redefining the filter, so the value won't be updated several times before the user completes its input.
        .pipe(debounceTime(300))
        // .subscribe(filter => this.filter = filter);
        .subscribe( filter => this.onTyping.emit(filter));
    }

    ngOnDestroy(): void {
        /* To prevent memory leaking, we have to finish the debounce subscription. In subscriptions, we have two ways of doing that: Either the method "complete" must be executed when the message has been manipulated or the method "unsubscribe" must be executed when we have finished our subscription. The formedr cannot be done since we do not know when the user will stop inputting data, so the later will me executed when the PhotoListComponent is destroyed. */
        this.debounce.unsubscribe();
    }
}