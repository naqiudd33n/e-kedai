import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DisplayComponentService {
    private _header: ReplaySubject<any> = new ReplaySubject<any>(1);
    private _headerTitle: ReplaySubject<any> = new ReplaySubject<any>(1);
    private _bottomNavigation: ReplaySubject<any> = new ReplaySubject<any>(1);
    private _navigation: ReplaySubject<any> = new ReplaySubject<any>(1);
    /**
     * Constructor
     */
    constructor(
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set header(value: any) { this._header.next(value); }
    get header$(): Observable<any> { return this._header.asObservable(); }

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set headerTitle(value: any) { this._headerTitle.next(value); }
    get headerTitle$(): Observable<any> { return this._headerTitle.asObservable(); }

    /**
     * Setter & getter for bottomNav
     *
     * @param value
     */
    set bottomNavigation(value: any) { this._bottomNavigation.next(value); }
    get bottomNavigation$(): Observable<any> { return this._bottomNavigation.asObservable(); }

    /**
     * Setter & getter for navigation
     *
     * @param value
     */
    set navigation(value: any) { this._navigation.next(value); }
    get navigation$(): Observable<any> { return this._navigation.asObservable(); }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    displayHeader(headerType: string): Observable<any> {
        this._header.next(headerType);
        return of(false);
    }

    setHeaderTitle(headerTitle: string): Observable<any> {
        this._headerTitle.next(headerTitle);
        return of(false);
    }

    displayBottomNavigation(bottomNavigation: boolean): Observable<any> {
        this._bottomNavigation.next(bottomNavigation);
        return of(false);
    }

    navigate(navigation: string): Observable<any> {
        this._navigation.next(navigation)
        return of(false)
    }
}
