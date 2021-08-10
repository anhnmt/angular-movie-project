export interface SideNavInterface {
  path: any[] | string;
  title: string;
  iconType: '' | 'nzIcon' | 'fontawesome';
  iconTheme: '' | 'fab' | 'far' | 'fas' | 'fill' | 'outline' | 'twotone';
  icon: string;
  submenu?: SideNavInterface[];
}
