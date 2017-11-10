import express from 'express';
import request from 'request';
import compress from 'compression';
import requestProxy from 'express-request-proxy';

import React from 'react'

import renderFullPage from './render_html'

module.exports = {
    app: function() {
        const app = express();
        const port = process.env.PORT || 8080;

        app.use(compress());
        app.use(express.static('./public'));

        // app.use('/api/v1/snomedct/:api_call', requestProxy({
        //     url: 'https://snomed.terminology.tools/content/concept/SNOMEDCT/:api_call',
        //     headers: {
        //         'Authorization': 'guest'
        //     }
        // }));
        app.use('/api/v1/snomedct/*', function(req, res) {
            const options = {
                url: 'https://snomed.terminology.tools/content/concept/SNOMEDCT' + req.originalUrl.substr(16),
                headers: {
                    Authorization: 'guest',
                    'Content-Type': 'application/json'
                }
            };
            // console.log(req);
            // console.log("=====");
            // console.log(req.body);
            // console.log(options);
            // req.pipe(request.post(options)).pipe(res)
            req.pipe(request(options)).pipe(res)
        });

        app.use((req, res, next) => res.status(200).send(renderFullPage())); // This is fired every time the server side receives a request
        // app.listen(port)
        app.set('port', port);

        return app
    }
}
