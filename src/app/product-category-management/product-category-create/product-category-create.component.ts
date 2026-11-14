import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { ProductCategory, ProductCategoryCreateRequest } from '../product-category-management.model';
import { ProductCategoryManagementApiService } from '../product-category-management-api.service';
import { getErrorMessage } from '../../utils/form-validators.util';

@Component({
    selector: 'app-product-category-create',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './product-category-create.component.html',
    styleUrl: './product-category-create.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryCreateComponent implements OnInit {
    protected form: FormGroup | undefined;
    readonly categories = input<ProductCategory[]>([]);

    private categoryApiService = inject(ProductCategoryManagementApiService);
    readonly categoryCreated = output<ProductCategory | undefined>();

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ]),
            parentId: new FormControl<number | null>(null),
        });
    }

    isSubmitDisabled(): boolean {
        return this.form?.invalid ?? true;
    }

    isFieldInvalid(controlName: string): boolean {
        const control: AbstractControl | null | undefined = this.form?.get(controlName);
        return !!(control && control.invalid && (control.touched || control.dirty));
    }

    getErrorMessage(controlName: string, fieldLabel: string): string | null {
        return getErrorMessage(this.form?.get(controlName), fieldLabel);
    }

    onSubmit(): void {
        if (this.form?.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const requestData: ProductCategoryCreateRequest = {
            name: this.form?.value.name,
            parentId: this.form?.value.parentId,
        };

        this.categoryApiService.createCategory(requestData).subscribe({
            next: createdCategory => {
                console.log('Kategorie erfolgreich erstellt:', createdCategory);
                this.categoryCreated.emit(createdCategory);
                this.form?.reset();
            },
            error: err => {
                console.error('Fehler beim Erstellen:', err);
            },
        });
    }

    onCancel(): void {
        this.categoryCreated.emit(undefined);
    }
}
