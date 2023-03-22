import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { BottomNavComponent } from './bottom-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [
        BottomNavComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        UserModule,
        SharedModule
    ],
    exports: [
        BottomNavComponent
    ]
})
export class BottomNavModule {
}
