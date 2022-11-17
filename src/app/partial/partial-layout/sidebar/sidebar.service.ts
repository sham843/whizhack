import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Management',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-chart-column',
      active: false,
      type: 'simple',
      url:'./dashboard'
    },
    {
      title: 'Blog Master',
      icon: 'fa-solid fa-blog',
      active: false,
      type: 'simple',
      url:'./blog-master'
    },
    // {
    //   title: 'Masters',
    //   icon: 'fa fa-tachometer-alt',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Group Master',
    //       url:'group-master'
    //     },
    //     {
    //       title: 'Category Master',
    //       url:'category-master'
    //     },
    //     {
    //       title: 'Parameter Master',
    //       url:'parameter-master'
    //     }
    //   ]
    // },
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
