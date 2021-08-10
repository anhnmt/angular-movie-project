import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyloadService {
  private observer: IntersectionObserver;

  constructor() {
    this.init();
  }

  observe(target: Element): void {
    // "trải chiếu nằm chờ" tấm ảnh scroll tới viewport
    this.observer.observe(target);
  }

  private init(): void {
    // Khởi tạo
    this.observer = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
        // chưa đến viewport, dừng sớm bớt đau khổ
        if (!entry.isIntersecting) {
          return;
        }

        // src được lưu trong data-src, chúng ta copy nó vào src là xong.
        const lazyImage = entry.target as HTMLImageElement;
        const src = lazyImage.dataset.src;

        // safety, doesn't have data-src attribute, stop
        if (!src) {
          return;
        }

        // nếu ảnh là thẻ img, copy vào src
        // nếu ảnh là background image, copy vào background-image
        lazyImage.tagName.toLowerCase() === 'img'
          ? lazyImage.src = src
          : lazyImage.style.backgroundImage = 'url(\'' + src + '\')';

        // xong việc thì nên dọn dẹp
        lazyImage.removeAttribute('lazy');

        // tiếp tục dọn dẹp
        imgObserver.unobserve(lazyImage);
      });
    });
  }
}
