import {Directive, HostListener} from '@angular/core';
import {NgControl} from '~/@angular/forms';
import {StringUtils} from '@/app/shared/utils/stringUtils';

@Directive({
  selector: '[formControlName][appSlugTransform]'
})
export class SlugTransformDirective {

  constructor(public ngControl: NgControl) {
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event): void {
    const newVal = StringUtils.convertToSlug(event);
    this.ngControl.valueAccessor.writeValue(newVal);
  }
  
}
