import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'voucher-details',
    templateUrl: './voucher-details.component.html',
    encapsulation: ViewEncapsulation.None
})
export class VoucherDetailsComponent implements OnInit {

    vouchers: any[] = [];
    /**
     * Constructor
     */
    constructor() {
    }

    ngOnInit(): void {
        this.vouchers = [
            { name: 'Razer gold 100', price: 100, validity: '20 January 2029', logo: 'https://blog.wallet-codes.com/wp-content/uploads/2021/08/Wallet-Codes-PH-New-Product-Razer-Gold-Main-Banners-Main-Banner-1080x1080-1.jpg' },
            { name: 'Mobile Lagend 900 Diamond', price: 350, validity: '58 March 3509', logo: 'https://www.esports.net/wp-content/uploads/2022/06/mobile-legends-ranking-system.jpg' },
            { name: 'Pubg (Mobile) 50 Token', price: 69, validity: '04 August 1998', logo: 'https://cms.mygameon.my/wp-content/uploads/2022/01/PUBG_NewKeyArt2022.jpg' }
        ]
    }
}
