import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  excludeZeroAtStart = '^(?!0+$)[0-9]{0,20}$';
  onlyAlphabet = '^[a-zA-Z]+$';
  alphabetsWithSpace = '^[a-zA-Z][a-zA-Z ]*$';
  alphaNumericOnly = '^[a-zA-Z0-9]*$';
  alphaNumericWithSpace = '^[a-zA-Z0-9][a-zA-Z0-9 ]*$';
  alphaNumericWithSpaceAndSpecialChar = '^[a-zA-Z0-9 /(,)&.+-@#$]*$';
  onlyNumbers = '^[0-9]*$';
  numbersWithDot = '^[0-9\s]*\.?[0-9\s]+$'
  valUserName = '^[^\\s\\[\\[`&-._@#%*!-+"\'\/\\]\\]{}][a-zA-Z@0-9.\\s]+$';
  valPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_!%^*?&])[A-Za-z0-9\d@#$_!%^*?&]{8,20}$';
  valMobileNo = '[6-9]\\d{9}';
  valOtp = '[0-9]\\d{6}';

  title =  '^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-()/,.0-9\\s]+$';
  valDescription = '^[^\\s\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z@#$%^&*()0-9.,\\s]+$'; // Description or commit
  // valEmailId = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  valEmailId='^[a-zA-Z0-9._%+-]+@([a-z0-9.]+[.])+[a-z]{2,5}$';
  authorName = '^[a-zA-Z. ]*$'
  constructor() { }

  onlyAlphabets(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([a-zA-Z])', 'g');
    return maskSeperator.test(event.key);
  }

  alphabetsWithSpaces(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z ])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumeric(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpaces(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9 ])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpacesWithSomeSpecChars(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9 /(,)&.+-])', 'g');
    return maskSeperator.test(event.key);
  }


  alphaNumericWithSpacesAndSpecChars(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([a-zA-Z0-9 /(,)&.+-@#$])', 'g');
    return maskSeperator.test(event.key);
  }

    numericWithSpacesAndSpecChars(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([0-9 +()-])', 'g');
    return maskSeperator.test(event.key);
  }


  

  onlyDigits(event: any) {
    const maskSeperator = new RegExp('^([0-9])', 'g');
    return maskSeperator.test(event.key);
  }

  onlydigitsWithDec(event: any) {
    if (event.target.selectionStart === 0 && (event.keyCode == 46)) return false;  // starting .Dot not accept
    if (event.currentTarget.value.split('.').length - 1 == 1 && (event.keyCode == 46)) return false;  // double .Dot not accept
    
    // if (event.target.selectionStart === 0 && (event.keyCode == 44)) return false;  // starting ,semi not accept
    
    const maskSeperator = new RegExp('^([0-9.])', 'g');
    return maskSeperator.test(event.key);
  }
  onlyDigitsExcludeZeroAtStart(event: any) {
    const maskSeperator = new RegExp('^[1-9][0-9]*$', 'g');
    if (event.currentTarget.value != "" && event.currentTarget.value.length > 0 && event.key == '0') {
      return true
    }
    return maskSeperator.test(event.key);
  }

  otp(event: any, length: number) {
    if (event.currentTarget.value.length > length - 1) {
      return false
    }
    const maskSeperator = new RegExp('^([0-9])', 'g');
    return maskSeperator.test(event.key);
  }

  noSpacesAtStart(event: any) {
    const maskSeperator = new RegExp('^[ ]+|[ ]+$', 'm');
    return !maskSeperator.test(event.key);
  }

  noSpaces(event: any) {
    const maskSeperator = new RegExp('^[ ]+|[ ]+$', 'gm');
    return !maskSeperator.test(event.key);
  }

  removeSpaceAtBegining(event: any) {
    let temp = true;
    try {
      if (!event.target.value[0].trim()) {
        event.target.value = event.target.value.substring(1).trim();
        temp = false;
      }
    }
    catch (e) {
      temp = false;
    }
    return temp
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null as any;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null as any : error;
    };
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors["confirmedValidator"]) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  //Latest Added

  acceptedOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  emailRegex(event: any) { //Email Validation
    if (!this.noSpacesAtStart(event)) return false; // First Space not Accept
    if (event.currentTarget.value.split('..').length - 1 == 1 && (event.keyCode == 46)) return false;  // double .Dot not accept
    if (event.currentTarget.value.split('@').length - 1 == 1 && (event.keyCode == 64)) return false;  // double @ not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 46)) return false;  // starting .Dot not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 64)) return false;  // starting @ not accept
    let key = parseInt(event.key); if (event.target.selectionStart === 0 && (!isNaN(key))) return false; // starting Number not accept
    const maskSeperator = new RegExp('^([a-zA-Z0-9 .@])', 'g'); // only Accept A-Z & 0-9 & .@
    return maskSeperator.test(event.key);
  }

  emailIdRegex(event: any) { //Email Validation not accepted capital letters
    if (!this.noSpacesAtStart(event)) return false; // First Space not Accept
    if (event.currentTarget.value.split('..').length - 1 == 1 && (event.keyCode == 46)) return false;  // double .Dot not accept
    if (event.currentTarget.value.split('@').length - 1 == 1 && (event.keyCode == 64)) return false;  // double @ not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 46)) return false;  // starting .Dot not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 64)) return false;  // starting @ not accept
    let key = parseInt(event.key); if (event.target.selectionStart === 0 && (!isNaN(key))) return false; // starting Number not accept
    const maskSeperator = new RegExp('^([a-z0-9 .@])', 'g'); // only Accept A-Z & 0-9 & .@
    return maskSeperator.test(event.key);
  }

  noFirstSpaceAllow(event: any) {  // for First Space Not Allow
    if (event.target.selectionStart === 0 && (event.code === 'Space')) {
      event.preventDefault();
    }
  }
  noSpaceAllow(event: any) {  // for All Space Not Allow
    if (event.code === 'Space') {
        event.preventDefault();
    }
}
percentage(event: any) {
  if (event.target.selectionStart === 0 && (event.keyCode == 46)) return false;  // starting .Dot not accept
  if (event.currentTarget.value.split('.').length - 1 == 1 && (event.keyCode == 46)) return false;  // double .Dot not accept
  
  if (event.target.selectionStart === 0 && (event.keyCode == 53 + event.shift)) return false;  // starting ,semi not accept
  
  const maskSeperator = new RegExp('^([0-9.%])', 'g');
  return maskSeperator.test(event.key);
}

}
