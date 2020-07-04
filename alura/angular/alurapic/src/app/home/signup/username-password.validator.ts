import { ValidatorFn, FormGroup } from '@angular/forms';

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if (userName != password ) {
        return null;
    }

    /* Do not validate if both fields are empty. */
    if ( userName.trim() + password.trim() ) {
        return userName != password ? 
            null : 
            { userNamePassword: true };
    } else {
        return null;
    }
}