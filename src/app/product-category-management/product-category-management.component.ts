import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryCreateComponent } from './product-category-create/product-category-create.component';
import { ProductCategoryManagementApiService } from './product-category-management-api.service';
import { ProductCategory } from './product-category-management.model';

@Component({
    selector: 'app-product-category-management',
    standalone: true,
    imports: [ProductCategoryListComponent, ProductCategoryCreateComponent],
    templateUrl: './product-category-management.component.html',
    styleUrl: './product-category-management.component.less',
})
export class ProductCategoryManagementComponent implements OnInit {
    showCreateForm: boolean = false;

    readonly categoryList = signal<ProductCategory[]>([]);

    private apiService = inject(ProductCategoryManagementApiService);

    ngOnInit(): void {
        this.loadCategoryList();
    }

    onClickCreate() {
        this.showCreateForm = true;
    }

    onCategoryCreated(createdCategory?: ProductCategory): void {
        this.loadCategoryList();
        this.showCreateForm = false;
    }

    private loadCategoryList(): void {
        this.apiService.getCategoryList().subscribe({
            next: data => {
                if (data.length == 0) {
                    console.info('Kategorie-Liste leer');
                }
                this.categoryList.set(data);
            },
            error: err => {
                console.error('Fehler beim Laden der Kategorie-Liste:', err);
            },
        });
    }
}
