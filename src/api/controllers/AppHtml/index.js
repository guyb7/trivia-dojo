import css from './styles.css.js'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

export default ({ appMarkup }) => {
  const cssTag = assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''
  const jsTag = process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`

  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Trivia Dojo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
    ${cssTag}
    ${jsTag}
    <style>
      ${css}
    </style>
  </head>
  <body>
    <div id="spinner-container">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <div id="root" class="hidden">${appMarkup}</div>
  </body>
</html>`

  return html
}
