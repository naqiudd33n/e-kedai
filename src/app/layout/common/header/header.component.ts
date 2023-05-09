import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { DisplayComponentService } from 'app/core/display-component/display-component.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
    headerType: string = 'default';
    headerTitle: string = '';
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _displayComponentService: DisplayComponentService,
        private _userService: UserService,
        private _router: Router,
        public _dialog: MatDialog,

    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: User) => {
                if (response) {
                    this.user = response;
                }
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Component display diffrently in difrent pages 
        this._displayComponentService.headerTitle$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                this.headerTitle = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // this routes implemented when route on init (if the app refreshed)
        const route = this._router.url;
        const validRoute = ['/', '/home', '/history', '/voucher', '/favourite', '/profile'].includes(route)
        this.headerType = (route && validRoute ? 'default' : 'back')

        // this routes implemented when route navigation happen
        this._router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll)).subscribe((response: NavigationEnd) => {

                let routes = response.url;

                // set the routes that only for the header of default
                const validRoutes = ['/', '/home', '/history', '/voucher', '/favourite', '/profile'];
                this.headerType = (validRoutes.includes(routes) ? 'default' : 'back')

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    chooseCountry() {
        const dialogRef = this._dialog.open(
            CountryDialogComponent, {
            width: '100%',
        });
        dialogRef.afterClosed().subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
