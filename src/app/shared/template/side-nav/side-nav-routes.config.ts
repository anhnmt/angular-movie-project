import {SideNavInterface} from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: ['/dashboard'],
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: []
  },
  {
    path: '',
    title: 'Countries',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'global',
    submenu: [
      {
        path: ['/dashboard', 'countries'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'countries', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Genres',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: [
      {
        path: ['/dashboard', 'genres'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'genres', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Movies',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'video-camera',
    submenu: [
      {
        path: ['/dashboard', 'movies'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'movies', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Movie Types',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'number',
    submenu: [
      {
        path: ['/dashboard', 'movies', 'types'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'movies', 'types', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Banners',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'team',
    submenu: [
      {
        path: ['/dashboard', 'banners'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'banners', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Roles',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'safety-certificate',
    submenu: [
      {
        path: ['/dashboard', 'roles'],
        title: 'Quyền',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'permissions'],
        title: 'Vai trò',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Users',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [
      {
        path: ['/dashboard', 'users'],
        title: 'Danh sách',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: ['/dashboard', 'users', 'create'],
        title: 'Thêm mới',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      }
    ]
  },
];
