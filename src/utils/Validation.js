const regexPhoneNumber = /^[789]\d{9}$/;
const regexOnlyCharacters = /^[a-zA-Z ]+$/;
const regexEmail =
  /^(([^<>()#[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,12}))$/;
const regexOnlyNumber = /^[0-9]\d{9}$/;
const regPassword =
  /(?=^.{8,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

export default class Validation {
  static validPhoneNumber = phoneNumber => {
    let isValid = true;
    if (!regexOnlyNumber.test(phoneNumber)) {
      isValid = false;
    }
    return isValid;
  };
  static validEmail = email => {
    let isValid = true;
    // console.log('regex', regexEmail.test(email));
    if (!regexEmail.test(email)) {
      isValid = false;
    }
    return isValid;
  };
  static validPassword = password => {
    let isValid = true;
    if (!regPassword.test(password)) {
      isValid = false;
    }
    return isValid;
  };
}
