import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  codecareerPage!: string;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  createCaptchaCarrerPage() {
    //clear the contents of captcha div first
    let id: any = document.getElementById('captcha');
    id.innerHTML = "";

    var charsArray = "0123456789";
    var lengthOtp = 4;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 0); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha1";
    canv.width = 80;
    canv.height = 30;
    //var ctx:any = canv.getContext("2d");
    var ctx: any = canv.getContext("2d");
    ctx.font = "28px Times New Roman";
    ctx.fillStyle = "#000000";
    ctx.fillText(captcha.join(""), 10, 26);
    // ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.codecareerPage = captcha.join("");
    let appendChild: any = document.getElementById("captcha");
    appendChild.appendChild(canv); // adds the canvas to the body element
  }

  checkvalidateCaptcha() {
    return this.codecareerPage;
  }

  matSnackBar(data: string, status: number) {
    let snackClassArr: any = ['snack-success', 'snack-danger', 'snack-warning'];
    this.snackBar.open(data, " ", {
      duration: 2000,
      panelClass: [snackClassArr[status]],
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'

    })
  }

  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == null || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

  getIpAddress() {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      console.log(res);
    
    })
  }

  getDeviceInfo() {
    var deviceInfo = this.deviceService.getDeviceInfo();
    console.log(deviceInfo);
  }

  routerLinkRedirect(path: any) {
    this.router.navigate([path], { relativeTo: this.route })
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['fontName', 'heading', 'fontSize', 'subscript', 'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent', 'heading',
        'fontName', 'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule', 'textColor',
        'backgroundColor',
        'removeFormat',
        'toggleEditorMode']
    ],
  };

  setDate(date:Date){
    let d=date;
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    return new Date(d)
  }

}
