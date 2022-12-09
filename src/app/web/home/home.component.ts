import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const myCarouselElement = document.querySelector('#homecarousel')
    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval:3000,
      wrap: true
    })
    console.log(carousel);
    
  }

}
