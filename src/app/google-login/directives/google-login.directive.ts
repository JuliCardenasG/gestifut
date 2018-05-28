import { Directive, EventEmitter, Output, ElementRef, NgZone } from '@angular/core';
import { LoadGoogleApiService } from "../services/load-google-api.service";

@Directive({
  selector: '[appGoogleLogin]'
})
export class GoogleLoginDirective {
  @Output() loginOk: EventEmitter<gapi.auth2.GoogleUser> = new EventEmitter<any>();
  @Output() loginError: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadingEnd: EventEmitter<void> = new EventEmitter<void>();

  constructor(private el: ElementRef, loadService: LoadGoogleApiService,
    private ngZone: NgZone) {
    loadService.getAuthApi().subscribe(auth2 => {
      auth2.attachClickHandler(el.nativeElement, {}, (user: gapi.auth2.GoogleUser) => {
        this.ngZone.run(() => this.loginOk.emit(user));
      }, error => this.loginError.emit(error));
      this.loadingEnd.emit();
    }),
    // tslint:disable-next-line:no-unused-expression
    error => this.loginError.emit(error);
  }

}
