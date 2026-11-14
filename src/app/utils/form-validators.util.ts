import { AbstractControl } from '@angular/forms';

export function getErrorMessage(control: AbstractControl | null | undefined, fieldLabel: string): string | null {
    if (!control || !control.errors) return null;

    const errorKey = Object.keys(control.errors)[0];
    const template = ERROR_TEMPLATES[errorKey];

    if (!template) {
        return 'Ungültige Eingabe.';
    }

    const errorValue = control.errors[errorKey];
    const requiredLength = errorValue?.requiredLength ?? '';

    return template.replace('{field}', fieldLabel).replace('{length}', requiredLength);
}

const ERROR_TEMPLATES: Record<string, string> = {
    required: '{field} muss angegeben sein!',
    minlength: '{field} muss mindestens {length} Zeichen lang sein!',
    maxlength: '{field} darf maximal {length} Zeichen lang sein!',
};
