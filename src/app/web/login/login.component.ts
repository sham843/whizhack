import { Component, OnInit } from '@angular/core';
import { CommonMethodService } from 'src/app/core/services/common-method.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor( private commonMethodService: CommonMethodService) { }

  ngOnInit(): void {
    this.captcha();
  }

  captcha() {
    this.commonMethodService.createCaptchaCarrerPage();
  }

}
