import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CompleteUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*     const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req.clone({
        url: 'http://localhost:3000/' + req.url
      }));
    } */
    const headers = req.clone({
      url: 'http://localhost:3000/' + req.url,
    });
    return next.handle(headers);
  }
}