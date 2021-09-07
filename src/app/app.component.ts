import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onActivate(event): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
