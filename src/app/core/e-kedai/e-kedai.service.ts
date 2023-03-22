import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'app/config/service.config';
import { map, Observable, ReplaySubject } from 'rxjs';
import { LogService } from 'app/core/logging/log.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Category } from './e-kedai.types';

@Injectable({
    providedIn: 'root'
})
export class EKedaiService {
    private _categories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);

    /**
    * Constructor
    */
    constructor(
        private _httpClient: HttpClient,
        private _apiServer: AppConfig,
        private _logging: LogService,
        private _authService: AuthService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /** Getter & Setter for categories */
    set categories(value: Category[]) { this._categories.next(value); }
    get categories$(): Observable<Category[]> { return this._categories.asObservable(); }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getAllProductCategory(params: { parentCategoryId: number } = { parentCategoryId: null }): Observable<any> {
        let billsService = this._apiServer.settings.apiServer.ekedaiService;

        const header = {
            headers: new HttpHeaders().set("Authorization", this._authService.publicToken),
            params
        };

        // Delete empty value
        Object.keys(header.params).forEach(key => {
            if (Array.isArray(header.params[key])) {
                header.params[key] = header.params[key].filter(element => element !== null)
            }
            if (header.params[key] === null || header.params[key] === undefined || (Array.isArray(header.params[key]) && header.params[key].length === 0)) {
                delete header.params[key];
            }
        });

        return this._httpClient.get<any>(billsService + '/product/category', header)
            .pipe(
                map((response) => {
                    this._logging.debug("Response from Bill Service (Get all bills category)", response);
                    this._categories.next(response.data);

                    return response.data;
                })
            );
    }

    getProductChildCategory(params: { parentCategoryId: number } = { parentCategoryId: null }): Observable<any> {
        let billsService = this._apiServer.settings.apiServer.ekedaiService;

        const header = {
            headers: new HttpHeaders().set("Authorization", this._authService.publicToken),
            params
        };

        // Delete empty value
        Object.keys(header.params).forEach(key => {
            if (Array.isArray(header.params[key])) {
                header.params[key] = header.params[key].filter(element => element !== null)
            }
            if (header.params[key] === null || header.params[key] === undefined || (Array.isArray(header.params[key]) && header.params[key].length === 0)) {
                delete header.params[key];
            }
        });

        return this._httpClient.get<any>(billsService + '/product/category', header)
            .pipe(
                map((response) => {
                    this._logging.debug("Response from Bill Service (Get Product Child Category)", response);

                    return response.data;
                })
            );

    }

}
