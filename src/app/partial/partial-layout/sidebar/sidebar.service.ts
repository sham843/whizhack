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
      active: true,
      type: 'simple',
      url:'./dashboard'
    },
    {
      title: 'Masters',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Blog Master',
          url:'blog-master'
        },
        {
          title: 'Gallery Master',
          url:'gallery-master'
        },
        {
          title: 'Media Coverage',
          url:'media-coverage'
        }
      ]
    },
    {
      title: 'Enquiries',
      icon: 'fa-solid fa-envelope',
      active: false,
      type: 'simple',
      url:'./enquiries'
    },
    {
      title: 'Training Schedule',
      icon: 'fa-solid fa-chalkboard-user',
      active: false,
      type: 'simple',
      url:'./training-schedule'
    },
    {
      title: 'Post Job',
      icon: 'fa-solid fa-briefcase',
      active: false,
      type: 'simple',
      url:'./post-job'
    },
    {
      title: 'Manage Meta Tags',
      icon: 'fa-solid fa-hashtag',
      active: false,
      type: 'simple',
      url:'./manage-meta-tags'
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
