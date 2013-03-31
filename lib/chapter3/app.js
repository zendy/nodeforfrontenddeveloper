var http = require( 'http' );
var querystring = require( 'querystring' );

http.createServer(function( req, res ) {
  // parse everything after the '?' into key/value pairs
  console.log( req.url );
  var qs = querystring.parse( req.url.split( '?' )[ 1 ] );
  // property names are the same in the querystring
  var userName = qs.firstName + ' ' + qs.lastName;
  var html = '<!doctype html>' +
      '<html><head><title>Hello ' + userName + '</title></head>' +
      '<body><h1>Hello, ' + userName + '!</h1></body></html>';

  res.end( html );
}).listen( 8000 );