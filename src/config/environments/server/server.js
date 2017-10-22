import express from 'express'
import compress from 'compression'

import React from 'react'

import renderFullPage from './render_html'

module.exports = {
    app: function() {
        const app = express();
        const port = process.env.PORT || 8080;

        app.use(compress());
        app.use(express.static('./public'))
        app.use((req, res, next) => res.status(200).send(renderFullPage())) // This is fired every time the server side receives a request

        // app.listen(port)
        app.set('port', port);

        return app
    }
}
