
const {
    Request
} = require('./helper/Request');

const {
    Parser, FindComment, UPloadCh
} = require('./helper/Parser');


function Search(){

  Request('berita','1w')
  .then(function (response) {
 
      const data = response.data
     
    console.log(Parser(data));
  })
  .catch(function (error) {
    console.log(error);
  });

}



//for find comment video using video ID  #uncomment
//FindComment("wsZFPns6DlE")


//for find upload from channel #uncomment
//UPloadCh("https://www.youtube.com/c/BelajarIT")



//for search video #uncomment
//Search()
