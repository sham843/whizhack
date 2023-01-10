import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './core/services/api.service';
import { ErrorHandlerService } from './core/services/error-handler.service';

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
    private titleService: Title, 
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private meta: Meta,
    private error: ErrorHandlerService,) {
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
    this.getAllPageName_MetaData();
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
      // let titleName = rt.data._value.breadcrumb[rt.data._value.breadcrumb?.length - 1].title;
      let titleName= rt.data._value.title
      rt.data.subscribe(() => {

        //........................... Code Start For Meta Data .................................//

        let currentURL: any = window.location.href;
        let currentURLNew: any;

        if (currentURL.split('/')?.length == 5) {
          currentURLNew = currentURL.split('/')[3] + '/' + currentURL?.split('/')[4]
        } else if (currentURL.split('/')?.length == 4) {
          currentURLNew = currentURL.split('/')[3]
        }

        let findObj = this.getAllMetaTagArray.find((ele:any)=>  {return ele.pageName == currentURLNew} );

        (findObj != undefined ) ? this.titleService.setTitle(findObj?.metaTitle) : this.titleService.setTitle(titleName);

        // (findObj != undefined)  ? this.meta.addTags([
        //   { name: 'description', content: findObj?.metadescription },
        //   { name: 'keywords', content: findObj?.keyWords }
        // ]) : this.meta.removeTagElement(findObj?.keyWords),this.meta.removeTagElement(findObj?.metadescription);

        if(findObj){
          this.meta.updateTag({ name: 'description', content: findObj?.metadescription })
          this.meta.updateTag({ name: 'keywords', content: findObj?.keyWords })
        }else{
          this.meta.removeTagElement(findObj?.keyWords);
          this.meta.removeTagElement(findObj?.metadescription);
        }

        //........................... Code End For Meta Data .................................//

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

  getAllMetaTagArray:any;
  getAllPageName_MetaData() {
    this.apiService.setHttp('get', 'whizhack_cms/metatag/getall', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.getAllMetaTagArray = res.responseData.responseData;
        }
        else {
          this.getAllMetaTagArray = [];
        }
      },
      error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

}
