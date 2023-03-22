import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EKedaiService } from 'app/core/e-kedai/e-kedai.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _eKedaiService: EKedaiService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._eKedaiService.getAllProductCategory({ parentCategoryId: null })
        ]);
    }
}
