import { TestBed } from '@angular/core/testing';

import { ProductCategoryManagementApiService } from './product-category-management-api.service';

describe('ProductCategoryManagementApiService', () => {
    let service: ProductCategoryManagementApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductCategoryManagementApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
