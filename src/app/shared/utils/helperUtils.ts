import {FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {StringUtils} from './stringUtils';

export class HelperUtils {
  static formChangedTitle(validateForm: FormGroup): void {
    validateForm.get('name').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((value: string) => {
      validateForm.patchValue({
        name: StringUtils.convertToTitleCase(value),
      });
    });
  }

  static formChangedTitleToSlug(validateForm: FormGroup, onDestroy$): void {
    validateForm.get('name').valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(onDestroy$),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        validateForm.get('slug').patchValue(
          StringUtils.convertToSlug(value)
        );
      });
  }

  static formValidator(validateForm: FormGroup, keys = []): void {
    console.log('check');
    for (const key of Object.keys(validateForm.controls)) {
      if (!keys.includes(key)) {
        validateForm.controls[key].markAsDirty();
        validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  static getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
