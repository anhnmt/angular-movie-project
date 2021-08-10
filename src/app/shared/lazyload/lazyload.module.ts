import {NgModule} from '@angular/core';
import {LazyloadDirective} from './lazyload.directive';


@NgModule({
  declarations: [LazyloadDirective],

  // chúng ta chỉ cần export directive để sử dụng, không cần export service ra ngoài
  exports: [LazyloadDirective],
})
export class LazyloadModule {
}
