import {Directive, ElementRef, Injector} from '@angular/core';
import {LazyloadService} from './lazyload.service';

@Directive({
  // Tận dụng thuộc tính "loading" làm directive selector
  // Bạn có thể sử dụng tên gì khác cũng được
  selector: '[loading]',
})
export class LazyloadDirective {

  constructor(
    private injector: Injector,
    private el: ElementRef,
  ) {
    const img = this.el.nativeElement;

    // Nếu browser đã support thuộc tính "loading", chúng ta không cần phải làm gì thêm nữa, hãy để nó làm công việc của nó.
    // Tuy nhiên nếu element không phải là img (nó là background image), thì fallback về intersection observable
    if ('loading' in HTMLImageElement.prototype && img.tagName.toLowerCase() === 'img') {
      img.src = img.dataset?.src;
    } else {
      // fallback sử dụng intersection observable API
      const lazyService = this.injector.get(LazyloadService);
      lazyService.observe(img);
    }
  }

}
