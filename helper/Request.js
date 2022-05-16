const Request = function(query, timeUpload) {

  let {
      UploadTime
  } = require('./UploadTime')
  time = UploadTime(timeUpload)
  axios = require('axios');

  let config = {
      method: 'get',
      url: `https://www.youtube.com/results?search_query=${query}&sp=${time}`,
  };

  return axios(config)

}

module.exports = {
  Request
}