import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../../shared/services/user.service';
import {SharedService} from '../../../shared/services/shared.service';
import {Country} from '../../../shared/interfaces/country';
import {CountryService} from '../../../shared/services/country.service';
import {StatusUtils} from '../../../shared/utils/statusUtils';

@Component({
  selector: 'app-country-index',
  templateUrl: './country-index.component.html',
  styleUrls: ['./country-index.component.css']
})
export class CountryIndexComponent implements OnInit {
  mapDefaultStatus = StatusUtils.mapDefaultStatus;

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
      console.log(this.countries);

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
