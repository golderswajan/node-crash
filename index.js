//dependencies
const http = require('http');
const {handleReqRes} = require('./helper/handleReqRes')
const url = require('url');
const {StringDecoder} = require('string_decoder');
const environment = require('./helper/environments');
const data = require('./lib/data')

//app object
const app = {};

//app configuration
// app.config = {
//         port : 3000
// };

// testing file system
data.create('test', 'test_file',{'name':'Bangladesh','language':'Bangla'}, (err) => {
        console.log('error is: '+err);
})

data.read('test', 'test_file', (err, data) => {
        console.log('data:'+data+' error is: '+err);
})

// data.update('test', 'test_file', {'name':'India','language':'Bangla'}, (err) => {
//         console.log('error is: ', err);
// })

// data.delete('test', 'test_file', (err, data) => {
//         console.log('error is: '+err);
// })


app.createServer = () => {
        const server = http.createServer(app.handleReqRes);
        server.listen(environment.port, () => {
                console.log(`environment: ${process.env.NODE_ENV}`);
                console.log(`Server is listening at port: ${environment.port}`);
        })

}

// handle req response
app.handleReqRes = handleReqRes;

// start the server
app.createServer()