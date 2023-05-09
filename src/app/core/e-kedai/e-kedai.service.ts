import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'app/config/service.config';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { LogService } from 'app/core/logging/log.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Bill, BillPagination, Category } from './e-kedai.types';

@Injectable({
    providedIn: 'root'
})
export class EKedaiService {
    private _categories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
    private _bills: ReplaySubject<Bill[]> = new ReplaySubject<Bill[]>(1);
    private _billPagination: BehaviorSubject<BillPagination | null> = new BehaviorSubject(null);

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

    /** Getter & Setter for bills */
    set bills(value: Bill[]) { this._bills.next(value); }
    get bills$(): Observable<Bill[]> { return this._bills.asObservable(); }


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

    getBillById(params:
        {
            page: number;
            categoryId: number;
            pageSize: number,
            sortBy: string,
            sortingOrder: string,
            status: string
        } =
        {
            page: null,
            categoryId: null,
            pageSize: null,
            sortBy: null,
            sortingOrder: null,
            status: null
        }
    ): Observable<any> {
        let billsService = this._apiServer.settings.apiServer.ekedaiService;
        let accessToken = this._authService.publicToken;

        const header = {
            headers: new HttpHeaders().set("Authorization", `${accessToken}`),
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

        return this._httpClient.get<any>(billsService + "/product/get-all", header)
            .pipe(
                tap((response) => {

                    this._logging.debug("Response from Product Service (Get Bill by Id)", response);

                    // if (params.providerProductId) {
                    //     this._logging.debug("Response from Product Service (getAllAttractions) - byId ", response);
                    //     this._attraction.next(response.data.content[0]);
                    // } else {
                    let billPagination = {
                        length: response.data.totalElements,
                        size: response.data.size,
                        page: response.data.number,
                        lastPage: response.data.totalPages,
                        startIndex: response.data.pageable.offset,
                        endIndex: response.data.pageable.offset + response.data.numberOfElements - 1
                    }

                    this._logging.debug("Response from Product Service (billPagination)", billPagination);
                    this._billPagination.next(billPagination);

                    //     // return response.data;
                    this._bills.next(response.data.content);
                    // }
                })
            );
    }

}
