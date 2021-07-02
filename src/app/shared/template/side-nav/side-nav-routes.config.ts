import {SideNavInterface} from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: []
  },
  {
    path: '',
    title: 'Người dùng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [
      {
        path: '/dashboard/users',
        title: 'Danh sách người dùng',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: '/dashboard/users/create',
        title: 'Thêm người dùng',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      }
    ]
  },
];
