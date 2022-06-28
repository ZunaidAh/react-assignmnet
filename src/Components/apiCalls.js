// GEtCall
var GetCall = function (method, callback, errorcallback) {
    //console.log(CLIENT_URL + method);
    try {
        fetch(method, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            pragma: 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        })
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            //console.log(CLIENT_URL + method, responseData);
            callback(responseData);
          })
          .catch(error => {
            errorcallback(error);
          });
    } catch (e) {
        console.log('Error module:PostCall');
        errorcallback();
    }
  };

export default {
    GetCall
};