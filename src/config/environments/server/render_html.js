import assets_path from '../../../../webpack-assets.json'

export default () => {
    const js_path = assets_path["reactapp"]["js"];
    const vendor_path = assets_path["vendor"]["js"];
    const build_guid = function() {
        const op = js_path.split('-')[1];
        return typeof op !== "undefined" ? "-" + op.split('.')[0] : "";
    }
    return `<!doctype html>
<html>
  <head>
    <title>
        Granify Test
    </title>
    <!--
        I am skipping favicons and metadata, because this isn't a real site
    -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900,900i" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/cdn-generated/reactapp.css?build=${build_guid()}" />
  </head>
  <body>
    <div id="reactapp"></div>
    <script>
      ${ process.env.NODE_ENV !== "production" ? "window.__DEV_MODE__ = true" : "" }
    </script>
    <script src="//code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
    <script src="//assets.transloadit.com/js/jquery.transloadit2-v2-latest.js" type="text/javascript"></script>
    <script src="https://js.stripe.com/v2/" type="text/javascript"></script>
    <script src="/cdn-generated/${vendor_path}" type="text/javascript"></script>
    <script src="/cdn-generated/${js_path}" type="text/javascript"></script>
    
  </body>
</html>`
}