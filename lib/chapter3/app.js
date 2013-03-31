/*var http = require( 'http' );
var querystring = require( 'querystring' );

http.createServer(function( req, res ) {
  // parse everything after the '?' into key/value pairs
  var qs = querystring.parse( req.url.split( '?' )[ 1 ] );
  // property names are the same in the querystring
  var userName = qs.firstName + ' ' + qs.lastName;
  var html = '<!doctype html>' +
      '<html><head><title>Hello ' + userName + '</title></head>' +
      '<body><h1>Hello, ' + userName + '!</h1></body></html>';

  res.end( html );
}).listen( 8000 );*/

/*var http = require( 'http' );
var url = require( 'url' );

http.createServer(function( req, res ) {
  // split out parts of the path
  var path = url.parse( req.url ).pathname.split( '/' );
  // handle GET requests to /sayHello/
  if ( req.method == 'GET' && path[1] == 'sayHello' ) {
    var userName = path[ 2 ] + ' ' + path[ 3 ];
    var html = '<!doctype html>' +
        '<html><head><title>Hello ' + userName + '</title></head>' +
        '<body><h1>Hello, ' + userName + '!</h1></body></html>';

    res.end( html );
  }
}).listen( 8000 );*/

var connect = require( 'connect' );
var connectRoute = require("connect-route");

connect(
  connect.static( __dirname + '/public' ),
  // create a router to handle application paths
  connectRoute( function( app ) {
    app.get( '/sayHello/:firstName/:lastName', function( req, res ) {
      var userName = req.params.firstName + ' ' + req.params.lastName;
      var html = '<!doctype html>' +
          '<html><head><title>Hello ' + userName + '</title></head>' +
          '<body><h1>Hello, ' + userName + '!</h1></body></html>';

      res.end( html );
    });
  })
).listen( 8000 );