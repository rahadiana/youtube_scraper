
const {
    Request
} = require('./helper/Request');

const {
    Parser
} = require('./helper/Parser');



Request('xiaomi','1y')
.then(function (response) {

    const data = response.data
    
  console.log(Parser(data));
})
.catch(function (error) {
  console.log(error);
});