import {Component, OnInit} from '@angular/core';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {Banner} from '../../../shared/interfaces/banner';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {BannerService} from '../../../shared/services/banner.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-banner-index',
  templateUrl: './banner-index.component.html',
  styleUrls: ['./banner-index.component.css']
})
export class BannerIndexComponent implements OnInit {
  mapDefaultStatus = GlobalUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  banners: Banner[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: Banner, b: Banner) => a.banner_id - b.banner_id,
    },
    {
      title: 'Tên phim',
      compare: (a: Banner, b: Banner) => a?.movie?.name.localeCompare(b?.movie?.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: Banner, b: Banner) => a?.movie?.slug.localeCompare(b?.movie?.slug)
    },
    {
      title: 'Trạng thái',
      compare: (a: Banner, b: Banner) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private bannerService: BannerService,
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
    const data = this.banners;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.banners = [];

    this.bannerService.getAllBanners().subscribe((response) => {
      this.banners = response.data;
      console.log(this.banners);

      this.displayData = this.banners;
    });
  }

  delete(bannerId: number): void {
    this.bannerService.deleteBannerByBannerId(bannerId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
