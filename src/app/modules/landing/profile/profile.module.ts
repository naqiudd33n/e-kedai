import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from 'app/modules/landing/profile/profile.component';
import { profileRoutes } from 'app/modules/landing/profile/profile.routing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        RouterModule.forChild(profileRoutes),
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        SharedModule
    ]
})
export class ProfileModule {
}
