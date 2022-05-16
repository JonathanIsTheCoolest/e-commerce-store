import { credentialsArray } from "./Signup/Signup";

export const emailValidation = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  if (!email.length) {
    return (
      ''
    )
  } else if (!email.match(regEx)) {
    return (
      'Enter A Valid Email Address'
    )
  } else if (credentialsArray.length) {
    for (let credentials in credentialsArray) {
      if (credentialsArray[credentials].email === email) {
        return (
          'An Account Already Exists With This Email Address'
        )
      }
    }
  }
}

export const passwordValidation = (password) => {
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]{8,20}$/ ;
  if (!password.length) {
    return (
      ''
    )
  } else if (!password.match(regEx)) {
    return (
      'Enter A Valid Password'
    )
  }
}

export const confirmPasswordValidation = (password, confirmPassword) => {
  const passOne = password;
  const passTwo = confirmPassword;
  if (!passTwo.length) {
    return (
      ''
    )
  } else if (passOne !== passTwo) {
    return (
      'Passwords Do Not Match'
    )
  }
}

export const nameValidation = (name) => {
  const regEx = /^[a-zA-Z\s]*$/ ;
  if (!name.length) {
    return (
      ''
    )
  } else if (!name.match(regEx)) {
    return (
      'Name Cannot Contain Numbers Or Special Characters'
    )
  }
}