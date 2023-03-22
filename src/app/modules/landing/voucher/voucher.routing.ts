import { Route } from '@angular/router';
import { VouchersComponent } from 'app/modules/landing/voucher/vouchers/vouchers.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';

export const voucherRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: '',
                component: VouchersComponent
            },
            {
                path: 'details',
                component: VoucherDetailsComponent
            }
        ]
    }
];
