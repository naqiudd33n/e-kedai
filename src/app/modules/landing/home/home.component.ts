import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EKedaiService } from 'app/core/e-kedai/e-kedai.service';
import { Category } from 'app/core/e-kedai/e-kedai.types';
import { Subject, takeUntil } from 'rxjs';
import * as mrz from 'mrz';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    categories: Category[] = [];
    deals: any[] = [];


    passportImage: any;
    mrzCode: string;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _eKedaiService: EKedaiService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _http: HttpClient
    ) {
    }

    ngOnInit(): void {

        // Call the categories
        this._eKedaiService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[]) => {

                let category = [
                    { id: 1, icon: 'assets/e-kedai/icon/category/utility.svg' },
                    { id: 2, icon: 'assets/e-kedai/icon/category/telco.svg' },
                    { id: 3, icon: 'assets/e-kedai/icon/category/voucher.svg' },
                    { id: 4, icon: 'assets/e-kedai/icon/category/gaming.svg' },
                    { id: 5, icon: 'assets/e-kedai/icon/category/entertainment.svg' },
                    { id: 6, icon: 'assets/e-kedai/icon/category/shopping.svg' },
                ];

                // Loop through each object in array 2
                category.forEach(obj2 => {
                    // Find the corresponding object in array 1 based on matching IDs
                    const obj1 = categories.find(obj1 => obj1.id === obj2.id);

                    // If object 1 exists, append the icon property from object 2
                    obj1['icon'] = obj2.icon;

                });

                // Now array 1 will have the icon property added to objects with matching IDs
                this.categories = categories;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.deals = [
            { image: 'https://img.freepik.com/premium-vector/best-deal-banner-design_535749-501.jpg' },
            { image: 'https://cdn1.vectorstock.com/i/1000x1000/92/25/amazing-deals-sale-offer-banner-vector-14299225.jpg' },
            { image: 'https://previews.123rf.com/images/starlineart/starlineart1707/starlineart170700306/82150388-modern-slae-voucher-or-banner-design-with-offer-and-deals-details.jpg' },
            { image: 'https://previews.123rf.com/images/denisined/denisined2005/denisined200500423/146747533-flash-sale-70-off-poster-design-template-discount-banner-special-offer-vector-illustration.jpg' }
        ]
    }

    selectCategory(category: Category) {
        this._router.navigate(['/section/' + category.id])
    }

    onSelectedFile(event: any) {
        const file: File = event.target.files[0];
        const reader = new FileReader();
    }

    onSubmit() {
        // const formData = new FormData();
        // formData.append('passportImage', this.passportImage);

        // this._http.post('/api/extract-passport', formData)
        //     .subscribe((response: any) => {
        //         console.log("response", response);
        //     }, (error: any) => {
        //         console.log("error", error);
        //     }
        //     );


    }

    parseMrzCode() {
        this.passportImage = mrz.parse(this.mrzCode);

        console.log("this.mrzCode", this.mrzCode);

    }
}
