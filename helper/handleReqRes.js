// Req Res handler
const url = require('url');
const {StringDecoder} = require('string_decoder');
const {notFoundHandler} = require('../handlers/routerHandlers/notFoundHandler');
const routes = require('../routers');

const handlers = {};

handlers.handleReqRes = (req, res) => {
        //request handling
        parseUrl = url.parse(req.url, true);
        path = parseUrl.pathname;
        trimmedPath = path.replace(/^\/+|\/+$/g,'')
        method = req.method.toLowerCase();
        const queryStringObject = parseUrl.query
        const headerObject =  req.headers;

        const requestProperties = {
            parseUrl,
            path,
            trimmedPath,
            method,
            queryStringObject,
            headerObject,
        }

        
        const decoder = new StringDecoder('utf-8')
        let realData = '';

        const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

        req.on('data', (buffer) => {
                realData += decoder.write(buffer);
        })

        req.on('end', () => {
            realData += decoder.end();
            
            chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};

            const payloadSring = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadSring);

            });
            //response handling
            // res.end('Hello World');
        })
        
}

module.exports = handlers