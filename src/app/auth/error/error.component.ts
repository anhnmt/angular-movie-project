import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  constructor(
    private location: Location
  ) {
  }

  onBack(): void {
    this.location.back();
  }

}
