import { AddressBook } from './../../core/models/address-book';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log(`HttpRequest was intercepted`);
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>> {
            const regex: RegExp = new RegExp(/\/api\/v2\/address\/\d+$/, 'g');
            console.log(`Intercept ${url}`);
            switch (true) {
                case url.endsWith('/api/v2/address') && method === 'GET':
                    return getAddresses();
                case url.endsWith('/api/v2/address') && method === 'POST':
                      return addAddress();
                case url.match(/\/api\/v2\/address\/\d+$/) && method === 'PUT':
                        return updateAddress();
                case url.match(/\/api\/v2\/address\/\d+$/) && method === 'GET' :
                    return getAddress();
                //case url.endsWith('/api/v2/address/1') :
                //      return getAddress();
                case url.match(/\/api\/v2\/address\/\d+$/) && method === 'DELETE':
                    return deleteAddress();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getAddresses(): Observable<HttpResponse<any>> {
            return ok(addresses);
        }

        function deleteAddress(): Observable<HttpResponse<any>> {

            addresses = addresses.filter(x => x.id !== idFromUrl());
            localStorage.setItem('addressbook', JSON.stringify(addresses));
            return ok();
        }

        function updateAddress(): Observable<HttpResponse<any>> {

          addresses = addresses.filter(x => x.id !== idFromUrl());
          localStorage.setItem('addressbook', JSON.stringify(addresses));
          return ok();
        }

        function addAddress(): Observable<HttpResponse<any>> {

          addresses = addresses.filter(x => x.id !== idFromUrl());
          localStorage.setItem('addressbook', JSON.stringify(addresses));
          return ok();
        }

        function getAddress(): Observable<HttpResponse<any>> {
          const address: AddressBook = addresses.find((obj) => obj.id = idFromUrl());
          return ok(address);
        }

        // helper functions

        function ok(body?: any): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message): Observable<never> {
            return throwError({ error: { message } });
        }

        function unauthorized(): Observable<never> {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn(): boolean {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl(): number {
            const urlParts = url.split('/');
            return +urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
