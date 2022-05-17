
const {
    Request
} = require('./helper/Request');

const {
    Parser, FindComment, UPloadCh
} = require('./helper/Parser');


function Search(){

  Request('puppeteer','1m')
  .then(function (response) {
 
      const data = response.data
     
    console.log(Parser(data));
  })
  .catch(function (error) {
    console.log(error);
  });

}



//for find comment video using video ID  #uncomment
//FindComment("yPy88Nk_Ytk")


//for find upload from channel #uncomment
//UPloadCh("https://www.youtube.com/c/BelajarIT")



//for search video #uncomment
//Search()