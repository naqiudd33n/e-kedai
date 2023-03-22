import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { VouchersComponent } from 'app/modules/landing/voucher/vouchers/vouchers.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
import { voucherRoutes } from 'app/modules/landing/voucher/voucher.routing';

@NgModule({
    declarations: [
        VouchersComponent,
        VoucherDetailsComponent
    ],
    imports: [
        RouterModule.forChild(voucherRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class VoucherModule {
}
