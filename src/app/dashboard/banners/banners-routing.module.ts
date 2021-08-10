import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BannerIndexComponent} from './banner-index/banner-index.component';
import {BannerCreateComponent} from './banner-create/banner-create.component';
import {BannerEditComponent} from './banner-edit/banner-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BannerIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: BannerCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':bannerId/edit',
        component: BannerEditComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule {
}
