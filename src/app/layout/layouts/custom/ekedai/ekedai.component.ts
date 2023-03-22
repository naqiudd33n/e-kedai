import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'ekedai-layout',
    templateUrl: './ekedai.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EKedaiLayoutComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
