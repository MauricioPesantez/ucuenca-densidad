import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/vivienda', title: 'Vivienda',  icon: 'home', class: '' },
    { path: '/vias', title: 'Vias',  icon: 'commute', class: '' },
    { path: '/agua-potable', title: 'Agua Potable',  icon: 'local_drink', class: '' },
    { path: '/alcantarillado', title: 'Alcantarillado',  icon: 'assistant_photo', class: '' },
    { path: '/luz-electrica', title: 'Luz Electrica',  icon: 'flash_on', class: '' },
    { path: '/areas-verdes', title: 'Areas Verdes',  icon: 'local_florist', class: '' },
    
    /*{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
