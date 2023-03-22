import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .mat-slide-toggle.mat-checked .mat-slide-toggle-bar {
                background-color: rgb(187 247 208) !important;
            }

            .mat-slide-toggle-thumb-container {
                position: absolute;
                z-index: 1;
                width: 18px !important;
                height: 18px !important;
                top: 2px !important;
                left: 2px !important;
                display: block;
            }
            .mat-slide-toggle-bar {
                background-color: rgb(254 202 202) !important;
                position: relative;
                width: 38px !important;
                height: 22px !important;
                border-radius: 50px !important;
            }

            .mat-slide-toggle-thumb {
                height: 18px !important;
                width: 18px !important;
                border-radius: 50%;
                display: block;
            }

            .mat-slide-toggle .mat-slide-toggle-thumb {
                background-color: rgb(153 27 27) !important;
                border: 1px solid #efefef !important;
            }

            .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb {
                background-color: rgb(22 101 52) !important;
                border: 1px solid #efefef !important;
            }

        `
    ]
})
export class ProfileComponent {
    /**
     * Constructor
     */
    constructor() {
    }
}
