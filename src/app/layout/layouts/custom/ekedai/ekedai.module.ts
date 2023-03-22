import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { BottomNavModule } from 'app/layout/common/bottom-nav/bottom-nav.module';
import { HeaderModule } from 'app/layout/common/header/header.module';
import { SharedModule } from 'app/shared/shared.module';
import { EKedaiLayoutComponent } from './ekedai.component';

@NgModule({
    declarations: [
        EKedaiLayoutComponent
    ],
    imports: [
        RouterModule,
        FuseLoadingBarModule,
        HeaderModule,
        BottomNavModule,
        SharedModule
    ],
    exports: [
        EKedaiLayoutComponent
    ]
})
export class EKedaiLayoutModule {
}
