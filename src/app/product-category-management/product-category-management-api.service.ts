import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryCreateRequest, ProductCategory } from './product-category-management.model';
import { ProductCategoryApi } from '@sebportfolio/lisa-catalog-api';

@Injectable({
    providedIn: 'root',
})
export class ProductCategoryManagementApiService {
    private readonly api = inject(ProductCategoryApi);

    public getCategoryList(): Observable<ProductCategory[]> {
        return this.api.getCategoryList();
    }

    public createCategory(createRequest: ProductCategoryCreateRequest): Observable<ProductCategory> {
        console.log('Erstell Anfrage: ', createRequest);
        return this.api.createCategory(createRequest);
    }
}
