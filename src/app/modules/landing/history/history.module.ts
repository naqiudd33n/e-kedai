import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HistoryComponent } from 'app/modules/landing/history/history.component';
import { historyRoutes } from 'app/modules/landing/history/history.routing';

@NgModule({
    declarations: [
        HistoryComponent
    ],
    imports: [
        RouterModule.forChild(historyRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class HistoryModule {
}
