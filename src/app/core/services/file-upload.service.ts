import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommonMethodService } from './common-method.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private apiService: ApiService,
    private commonService: CommonMethodService,
    private error: ErrorHandlerService) { }

  uploadDocuments(event: any, folderName?: any, allowedDocTypes?: any, _minsize?: any, _maxsize?: any) {
    return new Observable(obj => {
      const selResult = event.target.value.split('.');
      const docExt = selResult.pop();
      docExt.toLowerCase();
      if (allowedDocTypes.match(docExt)) {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          if (file.size > 10485760) {
            obj.error("Required file size should be less than " + 10 + " MB.");
          }
          else {
            const reader: any = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              formData.append('FolderName', folderName);
              formData.append('DocumentType', docExt);
              formData.append('UploadDocPath', file);
              this.apiService.setHttp('post', 'whizhack_cms/upload/upload-photo', false, formData, false, 'whizhackService');
              this.apiService.getHttp().subscribe({
                next: (res: any) => {
                  if (res.statusCode === "200") {
                    obj.next(res);
                  }
                  else {
                    this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
                  }
                },
                error: ((error: any) => {
                  this.error.handelError(error.status);
                })
              })
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }
      else {
        obj.next('error');
        obj.error("Only " + allowedDocTypes + " file format allowed.");
        this.commonService.matSnackBar('Only Supported file Types... pdf, jpg, png, jpeg', 1)
      }
    })
  }


  uploadMultipleDocument(event: any, _folderName?: any, allowedDocTypes?: any) {

    let docTypeCheckFlag = true;
    return new Observable(obj => {
      const formData = new FormData();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          formData.append("files", event.target.files[i]);
          let nameText = event.target.files[i].name;
          console.log(nameText,'444')
          const selResult = nameText.split('.');
          const docExt = selResult.pop();
          const docExtLowerCase =  docExt.toLowerCase();
          if (allowedDocTypes.match(docExtLowerCase)) { }
          else {
            docTypeCheckFlag = false;
          }
        }
      }

      if (docTypeCheckFlag == true) {
        this.apiService.setHttp('post', 'whizhack_cms/upload/upload-multiple-photos' , false, formData, false, 'whizhackService');
        this.apiService.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode === "200") {
              obj.next(res);
            }
            else {
              this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) :''// this.toastrService.error(res.statusMessage);
            }
          },
          error: ((error: any) => {
            this.error.handelError(error.status);
          })
        })
      }
      else {
        obj.error("Only " + allowedDocTypes + " file format allowed.");
        this.commonService.matSnackBar("Only " + allowedDocTypes + " file format allowed.",1);
      }
    })
  }

}
