import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayComponentService } from 'app/core/display-component/display-component.service';
import { EKedaiService } from 'app/core/e-kedai/e-kedai.service';
import { Bill, Category } from 'app/core/e-kedai/e-kedai.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'section',
    templateUrl: './section.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .mdc-menu-surface.mat-mdc-select-panel {
                margin-top: 10px !important;
                border-radius: 10px !important;
                shadow: none !important;
            }
        `
    ]
})
export class SectionComponent implements OnInit {

    categoryId: number = null;
    categories: Category[];
    bills: Bill[];
    selectedCategoryId: number;
    providerLogo: string;
    proceed: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _eKedaiService: EKedaiService,
        private _displayComponentService: DisplayComponentService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.categoryId = parseInt(this._activatedRoute.snapshot.paramMap.get('category-id'));

        let title;
        switch (this.categoryId) {
            case 1: title = 'Utility Bills'; break;
            case 2: title = 'Telco'; break;
            case 3: title = 'Voucher'; break;
            case 4: title = 'Game'; break;
            case 5: title = 'Entertainment'; break;
            case 6: title = 'Shopping'; break;
        }

        this._displayComponentService.setHeaderTitle(title).subscribe();

        this._eKedaiService
            .getProductChildCategory({ parentCategoryId: this.categoryId })
            .subscribe((categories: Category[]) => {

                this.categories = categories;
            });

        this._eKedaiService.bills$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bills: Bill[]) => {
                this.bills = bills;

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

        this._displayComponentService.setHeaderTitle('').subscribe();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    selectBill(category: Category) {
        this.selectedCategoryId = category.id;

        const query = { categoryId: category.id, page: 0, pageSize: 10, sortBy: 'productName', sortingOrder: 'ASC', status: 'ACTIVE' };
        this._eKedaiService.getBillById(query).subscribe();


        console.log("category", category);
        console.log("selectedCategory", this.selectedCategoryId);


    }

    changeProvider(providerCode) {
        let i = this.bills.findIndex(item => item.id === providerCode);
        this.providerLogo = this.bills[i].featuredImage

        // enable back the procced button
        if (providerCode) {
            this.proceed = true;
        }
    }
}
