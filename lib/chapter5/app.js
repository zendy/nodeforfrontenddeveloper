var http = require( 'http' );
var querystring = require( 'querystring' );
var redis = require( 'redis' );
// create a redis client on redis default port
var db = redis.createClient( 6379, '127.0.0.1' );

db.set( 'Zendy', 'Wongso', function(){} );

http.createServer( function( req, res ) {
  var qs = querystring.parse( req.url.split( '?' )[1] );
  var firstName = qs.firstName;

  // get the last name for the submitted first name and render
  db.get( firstName, function( err, lastName ) {
    var userName = firstName + ' ' + lastName;
    var html = '<!doctype html>' +
      '<html><head><title>Hello ' + userName + '</title></head>' +
      '<body><h1>Hello, ' + userName + '!</h1></body></html>';

    res.end( html );
  });
}).listen( 8000 );