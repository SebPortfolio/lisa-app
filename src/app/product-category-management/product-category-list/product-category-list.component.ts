import { Component, input } from '@angular/core';
import { ProductCategory } from '../product-category-management.model';

@Component({
    selector: 'app-product-category-list',
    standalone: true,
    imports: [],
    templateUrl: './product-category-list.component.html',
    styleUrl: './product-category-list.component.less',
})
export class ProductCategoryListComponent {
    categoryList = input<ProductCategory[]>([]);
}
