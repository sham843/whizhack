import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-bg');
      } else {
        element.classList.remove('navbar-bg');
      }
    }
  openNav(){
    this.document.getElementById("myNav").style.width = "100%";
  }

  closeNav(){
    this.document.getElementById("myNav").style.width = "0%";
  }

}
