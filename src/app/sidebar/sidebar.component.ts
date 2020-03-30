import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
  { path: '/local-case', title: 'Local Cases', icon: 'pe-7s-note2', class: '' },
  { path: '/foreign-case', title: 'Foreign Cases', icon: 'pe-7s-note2', class: '' },
  { path: '/ofw-case', title: 'OFW Cases', icon: 'pe-7s-note2', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
