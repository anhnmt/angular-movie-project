import {AfterViewChecked, Directive} from '@angular/core';

declare var $: any; // JQuery

@Directive({
  selector: '[sideNav]'
})
export class SideNavDirective implements AfterViewChecked {

  ngAfterViewChecked(): void {
    $('.side-nav .side-nav-menu:not(.ant-menu-inline-collapsed) li a').click(function(event): void {
      if ($(this).parent().hasClass('ant-menu-submenu-open')) {

        $(this).parent().children('.dropdown-menu').slideUp(200, function(): void {
          $(this).parent().removeClass('ant-menu-submenu-open');
        });

      } else {
        $(this).parent().parent().children('li.ant-menu-submenu-open').children('.dropdown-menu').slideUp(100);
        $(this).parent().parent().children('li.ant-menu-submenu-open').children('a').removeClass('ant-menu-submenu-open');
        $(this).parent().parent().children('li.ant-menu-submenu-open').removeClass('ant-menu-submenu-open');
        $(this).parent().children('.dropdown-menu').slideDown(100, function(): void {
          $(this).parent().addClass('ant-menu-submenu-open');
        });
      }
    });

  }
}
