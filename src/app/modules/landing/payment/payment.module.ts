import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentComponent } from 'app/modules/landing/payment/payment.component';
import { paymentRoutes } from 'app/modules/landing/payment/payment.routing';

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        RouterModule.forChild(paymentRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class PaymentModule {
}
