import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        UserModule,
        SharedModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
