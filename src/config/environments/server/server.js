import express from 'express';
import request from 'request';
import compress from 'compression';

import React from 'react'

import renderFullPage from './render_html'

module.exports = {
    app: function() {
        const app = express();
        const port = process.env.PORT || 8080;

        app.use(compress());
        app.use(express.static('./public'));

        app.use('/api/v1/snomedct/', function(req, res) {

            const options = {
                url: 'https://snomed.terminology.tools/content/concept/SNOMEDCT' + req.originalUrl.substr(16),
                headers: {
                    'Authorization': 'guest'
                }
            };
            // console.log(options.url, req.originalUrl.substr(16));
            req.pipe(request.post(options)).pipe(res)
        });

        app.use((req, res, next) => res.status(200).send(renderFullPage())); // This is fired every time the server side receives a request
        // app.listen(port)
        app.set('port', port);

        return app
    }
}
