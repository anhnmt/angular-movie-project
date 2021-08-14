import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Country} from '@/app/shared/interfaces/country';
import {Genre} from '@/app/shared/interfaces/genre';
import {forkJoin} from 'rxjs';
import {ClientService} from '@/app/shared/services/client.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: [
    '../../../assets/client.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ClientLayoutComponent implements OnInit {

  genres: Genre[] = [];
  countries: Country[] = [];

  constructor(
    private clientService: ClientService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'backgroundColor', '#0c0c0c');
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'color', '#e5e5e5');

    forkJoin([
      this.clientService.getAllGenres(),
      this.clientService.getAllCountries(),
    ])
      .subscribe(([genres, countries]) => {
        this.genres = genres.data;
        this.countries = countries.data;
      });
  }

  ngOnInit(): void {
  }

}
