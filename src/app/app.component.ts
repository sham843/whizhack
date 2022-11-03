import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'whizhack';
  visible: boolean | undefined;
  offline: Boolean = true;

  constructor(private router: Router,
    private titleService: Title, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event: any) => { //beefore page load spinner is show
      if (event instanceof NavigationStart) {
        // this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }
  ngOnInit() {
    this.router.events.subscribe((event: any) => { // each and every page default call spinner and window scroll 
      if (event instanceof NavigationStart) {
        // this.spinner.show()
      } else if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd),  // set title dynamic
    ).subscribe(() => {
      var rt = this.getChild(this.activatedRoute);
      let titleName = rt.data._value.breadcrumb[rt.data._value.breadcrumb?.length - 1].title;
      rt.data.subscribe(() => {
        this.titleService.setTitle(titleName)
      })
    });

    if (environment.production) { // redirect
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

}
