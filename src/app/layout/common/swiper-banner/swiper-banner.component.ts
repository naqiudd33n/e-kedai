import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { SwiperComponent } from 'swiper/angular';
import { DOCUMENT } from '@angular/common';

SwiperCore.use([Pagination, Navigation, Autoplay]);


@Component({
    selector: 'swiper-banner',
    templateUrl: './swiper-banner.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        /* language=SCSS */
        `
        @import "swiper/css";
        @import "swiper/css/pagination";
        @import "swiper/css/navigation";
        @import "swiper/css/effect-cards";

        .swiper {
            width: 100%;
            height: 100%;
          }
          
        .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        }
        
        .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        }

        /* Pagination */
        :host ::ng-deep .swiper-pagination { 
            top: 88%;
            left: -30% !important;
            
            @screen sm {
                top: 88%;
                left: -40% !important;
            }
            @screen md {
                top: 92%;
                left: -40% !important;
            }
            .swiper-pagination-bullet { 
                    background: #979797; 
                    width: 0.7rem; 
                    height: 0.7rem; 
                    opacity: 50%;
                } 

            .swiper-pagination-bullet-active { 
                background: var(--fuse-primary); 
                opacity: 1; 
                width: 40px;
                border-radius: 15px;
            } 
        }
        
        /* to customize Navigation buttons */
        // .swiper-button-next:after, .swiper-button-prev:after {
        //     position: absolute;
        //     top: 50%;
        //     width: calc(var(--swiper-navigation-size) / 44 * 27);
        //     height: var(--swiper-navigation-size);
        //     margin-top: calc(0px - var(--swiper-navigation-size) / 2);
        //     z-index: 10;
        //     cursor: pointer;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     color: var(--fuse-primary);

        // }
          
        `],

    // styleUrls    : ['./category-carousel.component.scss'],
})
export class SwiperBannerComponent {

    @ViewChild(SwiperComponent) swiper: SwiperComponent;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    galleryImages: any[] = [];
    mobileGalleryImages: any[] = [];
    currentScreenSize: string[];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router,
        @Inject(DOCUMENT) private _document: Document,
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

        // Get banners
        this.galleryImages = [
            {
                id: 1,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_image_a2c487e0d1.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 2,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_plans_ef8bc4f20c.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 3,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_services_3a9a20fb47.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 4,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_about_ce37f203a4.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            }
        ]

        this.mobileGalleryImages = [
            {
                id: 1,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_image_a2c487e0d1.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 2,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_plans_ef8bc4f20c.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 3,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_services_3a9a20fb47.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            },
            {
                id: 4,
                bannerUrl: 'https://hellosim.com.my/uploads/hero_about_ce37f203a4.webp',
                regionCountryId: '',
                type: 'MOBILE',
                actionUrl: null,
                sequence: 1,
                delayDisplay: 10
            }
        ]

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                this.currentScreenSize = matchingAliases;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {

        setTimeout(() => {

        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    swipePrev() {
        this.swiper.swiperRef.slidePrev();
    }
    swipeNext() {
        this.swiper.swiperRef.slideNext();
    }

    onSlideChange(swiper: any) {
        if ((this.galleryImages && this.galleryImages.length) || (this.mobileGalleryImages && this.mobileGalleryImages.length)) {
            if (this.currentScreenSize.includes('sm')) {
                const delayInMs = this.galleryImages[swiper[0].realIndex].delayDisplay * 1000;
                swiper[0].params.autoplay.delay = delayInMs;
            }
            else {
                const delayInMs = this.mobileGalleryImages[swiper[0].realIndex].delayDisplay * 1000;
                swiper[0].params.autoplay.delay = delayInMs;
            }
        }
    }

    actionOnClick(url: string) {
        if (url) {
            // this._router.navigate(['/promotion/' + url])
            this._document.location.href = url;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}
