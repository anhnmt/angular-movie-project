import {Component, OnInit} from '@angular/core';
import {TableService} from '@/app/shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '@/app/shared/services/shared.service';
import {Country} from '@/app/shared/interfaces/country';
import {CountryService} from '@/app/shared/services/country.service';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';

@Component({
  selector: 'app-country-index',
  templateUrl: './country-index.component.html',
  styleUrls: ['./country-index.component.css']
})
export class CountryIndexComponent implements OnInit {
  mapDefaultStatus = GlobalUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  countries: Country[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: Country, b: Country) => a.country_id - b.country_id,
    },
    {
      title: 'Quốc gia',
      compare: (a: Country, b: Country) => a.name.localeCompare(b.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: Country, b: Country) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Trạng thái',
      compare: (a: Country, b: Country) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private countryService: CountryService,
    private sharedService: SharedService,
  ) {
    this.sharedService.changeEmitted$.subscribe(() => {
      this.list();
    });
  }

  ngOnInit(): void {
    this.list();
  }

  search(): void {
    const data = this.countries;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.countries = [];

    this.countryService.getAllCountries().subscribe((response) => {
      this.countries = response.data;

      this.displayData = this.countries;
    });
  }

  delete(countryId: number): void {
    this.countryService.deleteCountryByCountryId(countryId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
