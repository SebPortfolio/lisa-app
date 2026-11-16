import { Component } from '@angular/core';
import { ProductCategoryManagementComponent } from './product-category-management/product-category-management.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ProductCategoryManagementComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'lisa-app';
}
