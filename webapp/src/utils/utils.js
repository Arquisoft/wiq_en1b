/**
 * Receives an error found in a catch after doing some axios petition in the try
 * returns {status: "4xx", error: "error message"}
 * or {status: "500", error: "Internal server error"}
 * @param {*} error 
 */

function manageError(error){
    if(error.response)
        return {status : error.response.status, error : error.response.data.error};
    else //Some other error
      return {status : 500, error : "Interanl server error"};
}

function validateEmail(errors, email){
    var isValid = String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(!isValid)
        errors.push("addUser.error_wrong_email_format")
}

function validateUsername(errors, username){
    if(/\s/.test(username)){
        //Spaces in username
        errors.push("addUser.error_username_spaces");
      }
}

function validatePasswords(errors, password, repeatPassword){
    if(password !== repeatPassword){
        //User put the same password
        errors.push("addUser.error_passwords_no_match");
      }
      if(/\s/.test(password)){
        //User put spaces in password
        errors.push("addUser.error_password_spaces");
      }
      if(password.length < 8){
        //Password too short
        errors.push("addUser.error_password_minimum_length");
      }
  
      if(password.length > 64){
        //Password too long
        errors.push("addUser.error_password_maximum_length");
      }
}

module.exports = {
    manageError,
    validateEmail,
    validateUsername,
    validatePasswords
};