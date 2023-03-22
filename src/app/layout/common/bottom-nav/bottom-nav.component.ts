import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Router } from '@angular/router';

@Component({
    selector: 'bottom-nav',
    templateUrl: './bottom-nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BottomNavComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    navigation: any[] = [];
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
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

        // set navigation 
        this.navigation = [
            { name: 'Home', icon: 'heroicons_outline:home', link: '/home', isActive: false },
            { name: 'History', icon: 'mat_outline:history', link: '/history', isActive: false },
            { name: 'My Voucher', icon: 'heroicons_outline:ticket', link: '/voucher', isActive: false },
            { name: 'Favourite', icon: 'heroicons_outline:heart', link: '/favourite', isActive: false },
            { name: 'Profile', icon: 'heroicons_outline:user', link: '/profile', isActive: false }
        ];
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

    onRouterLinkActive(event: boolean, index: number) {
        this.navigation[index].isActive = event;
    }

}
