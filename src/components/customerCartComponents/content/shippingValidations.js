export const nameAndTitle = (value, placeHolder) => {
  const regEx = /^[a-zA-Z\s-.]{2,}$/ ;
  if (!value.length) {
    return (
      ''
    )
  } else if (!value.match(regEx)) {
    return (
      `${placeHolder} cannot contain numbers or special characters besides - or . and must be at least two characters in length`
    )
  }
}

export const addressValidation = (value) => {
  const regEx = /^[a-zA-Z\d\s-,.'/]{3,}$/ ;
  if (!value.length) {
    return (
      ''
    )
  } else if (!value.match(regEx)) {
    return (
      `Address cannot contain special characters besides - / , . '  and must be at least three characters in length`
    )
  }
}