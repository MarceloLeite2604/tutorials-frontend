/* Platform ID is a injection token. Most of the times we inject elements by type. On "platformId", we will use a token to inject an element (similar to a "@Named(objectName)" annotation on Java. */
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn: 'root'})
export class PlatformDetectorService {

    constructor(@Inject(PLATFORM_ID) private platformId: string){}

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}