import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() { }

  checkUserIsLoggedIn() { // check user isLoggedIn or not
    let sessionData: any = sessionStorage.getItem('loggedIn');
    sessionData == null || sessionData == '' ? localStorage.clear() : '';
    if (localStorage.getItem('loggedInData') && sessionData == 'true') return true;
    else return false;
  }

  getLoggedInLocalstorageData() {
    if (this.checkUserIsLoggedIn() == true) {
      let data = JSON.parse(localStorage['loggedInData']);
      return data;
    }
  }

  getUserId(){
    let data =this.getLoggedInLocalstorageData();
    return data.responseData.id
  }

  getUserName(){
    let userName = this.getLoggedInLocalstorageData().responseData?.userName;
    return userName;
  }

  createdByProps(): any {
    return {
        "createdBy": this.getUserId() || 0,
        "modifiedBy": this.getUserId() || 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false
    }
}
}
