import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.css']
})
export class WebLayoutComponent implements OnInit {
  hideHeaderFooter!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.hideHeaderFooter = false;
        } else {
          this.hideHeaderFooter = true;
        }
      }
    });
  }


  ngOnInit(): void {
  }

}
