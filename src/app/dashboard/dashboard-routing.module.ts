import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '@/app/dashboard/profile/profile.component';
import {DashboardComponent} from '@/app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashboardComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: {
      title: 'User '
    }
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    data: {
      title: 'Movie '
    }
  },
  {
    path: 'movies/types',
    loadChildren: () => import('./movie-type/movie-type.module').then(m => m.MovieTypeModule),
    data: {
      title: 'Movie '
    }
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
    data: {
      title: 'Country '
    }
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule),
    data: {
      title: 'Genre '
    }
  },
  {
    path: 'banners',
    loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule),
    data: {
      title: 'Banner '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
