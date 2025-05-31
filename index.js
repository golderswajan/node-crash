//dependencies
const http = require('http');
const {handleReqRes} = require('./helper/handleReqRes')
const url = require('url');
const {StringDecoder} = require('string_decoder');
const environment = require('./helper/environments');

//app object
const app = {};

//app configuration
// app.config = {
//         port : 3000
// };

app.createServer = () => {
        const server = http.createServer(app.handleReqRes)
        server.listen(environment.port, () => {
                console.log(`environment: ${process.env.NODE_ENV}`);
                console.log(`Server is listening at port: ${environment.port}`);
        })

}

// handle req response
app.handleReqRes = handleReqRes;

// start the server
app.createServer()