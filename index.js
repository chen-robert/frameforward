const http = require("http");
const path = require("path");
const args = require("args");

args
  .option("port", "The port to listen on [process.env.PORT]", process.env.PORT || 8080)
  .option("url", "The url to display [process.env.URL]", process.env.URL)
  .option("verbose", "Verbose logging", false);

const flags = args.parse(process.argv);

if(flags.url === undefined) {
  console.error("Please provide an url to display with --url");
  return;
}

function clean (url) {
  if(!url.startsWith("http")) return "http://" + url;
  return url;
}

const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));

const URL = clean(flags.url);
const PORT = flags.port;

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type" : "text/html"});
  res.end(`
    <html>
      <head></head>
      <body>
        <style>
        * {
          padding: 0;
          margin: 0;
        }
        iframe {
          border: 0;
          width: 100vw;
          height: 100vh;
        }
        </style>
        <iframe src="${escapeHTML(URL)}"></iframe>
      </body>
    </html>
  `);

}).listen(PORT, () => console.log(`Started proxying to [${URL}] on port ${PORT}`));
