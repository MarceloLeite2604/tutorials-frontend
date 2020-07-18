import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {

    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }
    }

    return null;
}

export function isLowerCase(value: string) {
    if (value.trim()) {
        return /^[a-z0-9_\-]+$/.test(value);
    }

    return false;
}