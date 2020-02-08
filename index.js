#!/usr/bin/env node

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
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`[${ip}] ${req.method} ${req.url}`);
  
  const padding = "  > ";
  if(flags.verbose) {
    for([header, val] of Object.entries(req.headers)) {
      console.log(padding + `${header}: ${val}`);
    }
		
		let body = "";
    req.on('readable', function() {
      body += req.read();
    });
    req.on('end', function() {
      console.log(padding + `[${ip}] :` + body);
			console.log();
    });

    console.log();
  }

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

}).listen(PORT, () => console.log(`Started ${
    flags.verbose? "verbose ": ""
  }proxying to [${URL}] on port ${PORT}`));
