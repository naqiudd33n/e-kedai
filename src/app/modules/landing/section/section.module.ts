import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { SectionComponent } from 'app/modules/landing/section/section.component';
import { sectionRoutes } from 'app/modules/landing/section/section.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        SectionComponent
    ],
    imports: [
        RouterModule.forChild(sectionRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class SectionModule {
}
