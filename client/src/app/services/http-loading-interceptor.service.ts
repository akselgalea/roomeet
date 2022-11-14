import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.loadingService.show();

      return next.handle(req)
        .pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.loadingService.hide();
            }
          }, (error) => {
              this.loadingService.hide();
          }));
  }
}
