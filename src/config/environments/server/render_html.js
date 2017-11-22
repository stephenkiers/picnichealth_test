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
        React Starting Point Test
    </title>
    <!--
        I am skipping favicons and metadata, because this isn't a real site
    -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <link rel="stylesheet" type="text/css" href="/cdn-generated/reactapp.css?build=${build_guid()}" />
  </head>
  <body>
    <div id="reactapp"></div>
    <script>
      ${ process.env.NODE_ENV !== "production" ? "window.__DEV_MODE__ = true" : "" }
    </script>
    <script src="/cdn-generated/${vendor_path}" type="text/javascript"></script>
    <script src="/cdn-generated/${js_path}" type="text/javascript"></script>
    
  </body>
</html>`
}