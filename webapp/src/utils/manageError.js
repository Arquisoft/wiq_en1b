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

module.exports = {
    manageError
};