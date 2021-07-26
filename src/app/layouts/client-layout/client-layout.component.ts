import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: [
    '../../../assets/client.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ClientLayoutComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'backgroundColor', '#0c0c0c');
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'color', '#e5e5e5');
  }

  ngOnInit(): void {
  }

}
