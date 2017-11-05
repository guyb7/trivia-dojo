import App from '../../App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req, res) => {
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
  <html lang="">
  <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Trivia Dojo</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''}
      ${process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
  </head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>`
    );
  }
}
