import { Route } from '@angular/router';
import { SectionComponent } from 'app/modules/landing/section/section.component';

export const sectionRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: ':category-id',
                component: SectionComponent,
                // resolve         : {
                //     billsDetails     : BillsResolver
                // }
            },
        ]
    }
];
