import {FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {StringUtils} from './stringUtils';

export class HelperUtils {
  static formChangedTitleToSlug(validateForm: FormGroup): void {
    validateForm.get('name').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((value: string) => {
      validateForm.patchValue({
        name: StringUtils.convertToTitleCase(value),
        slug: StringUtils.convertToSlug(value)
      });
    });

    validateForm.get('slug').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((value: string) => {
      validateForm.patchValue({
        slug: StringUtils.convertToSlug(value)
      });
    });
  }

  static formValidator(validateForm: FormGroup): void {
    for (const key of Object.keys(validateForm.controls)) {
      validateForm.controls[key].markAsDirty();
      validateForm.controls[key].updateValueAndValidity();
    }
  }
}
