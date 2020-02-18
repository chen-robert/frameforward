# Frameforward

A simple npm package to serve an iFrame. 

## Usage

```bash
$ npx frameforward --url http://hasthelargehadroncolliderdestroyedtheworldyet.com/
Started proxying to [http://hasthelargehadroncolliderdestroyedtheworldyet.com/] on port 8080
```

Most of the parameters can also be specified through environmental variables.

```bash
$ npx frameforward --help
  Usage: frameforward [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -h, --help      Output usage information
    -p, --port <n>  The port to listen on [process.env.PORT] (defaults to 8080)
    -u, --url       The url to display [process.env.URL]
    -v, --verbose   Verbose logging (disabled by default)
    -V, --version   Output the version number
```
