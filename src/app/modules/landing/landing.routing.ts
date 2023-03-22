import { Route } from '@angular/router';
// import { LandingDataResolver } from './landing.resolvers';

export const landingRoutes: Route[] = [
    // Landing routes
    {
        path: '',
        // resolve: {
        //     landingDataResolver: LandingDataResolver
        // },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
            { path: 'history', loadChildren: () => import('app/modules/landing/history/history.module').then(m => m.HistoryModule) },
            { path: 'voucher', loadChildren: () => import('app/modules/landing/voucher/voucher.module').then(m => m.VoucherModule) },
            { path: 'profile', loadChildren: () => import('app/modules/landing/profile/profile.module').then(m => m.ProfileModule) }
        ]
    }
];
