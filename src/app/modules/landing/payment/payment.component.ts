import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DisplayComponentService } from 'app/core/display-component/display-component.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _displayComponentService: DisplayComponentService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._displayComponentService.setHeaderTitle('Payment').subscribe();

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        this._displayComponentService.setHeaderTitle('').subscribe();
    }
}
