import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { HomeResolver } from './home.resolver';

export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        resolve: {
            category: HomeResolver
        }
    }
];
