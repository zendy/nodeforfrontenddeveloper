/*var http = require( 'http' );
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
}).listen( 8000 );*/

/*var http = require( 'http' );
var querystring = require( 'querystring' );
var redis = require( 'redis' );
// create a redis client on redis default port
var db = redis.createClient( 6379, '127.0.0.1' );

db.hset( 'users', 'Zendy', 'Wongso', function(){} );

http.createServer( function( req, res ) {
  var qs = querystring.parse( req.url.split( '?' )[1] );
  var firstName = qs.firstName;
  var userName;
  var page;

  // get the value of the firstName key from within the users hash
  db.hget( 'users', firstName, function( err, value ) {
    if ( err ) {
      throw err;
    }
    userName = firstName + ' ' + value;
    var html = '<!doctype html>' +
      '<html><head><title>Hello ' + userName + '</title></head>' +
      '<body><h1>Hello, ' + userName + '!</h1></body></html>';
    res.end( html );
  });
}).listen( 8000 );*/

/*var connect = require( 'connect' );
var redis = require( 'redis' );
// create a redis client on redis default port
var db = redis.createClient( 6379, '127.0.0.1' );

db.hset( 'users', 'Zendy', 'Wongso', function(){} );

connect(
  connect.static( __dirname + '/public'),
  connect.bodyParser(),
  function( req, res ) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = firstName + ' ' + lastName;

    // store the submitted lastName using the firstName as a key
    db.hset( 'users', firstName, lastName, function( err, response ) {
      var html = '<!doctype html>' +
        '<html><head><title>Hello ' + userName + '</title></head>' +
        '<body><h1>Hello, ' + userName + '!</h1></body></html>';
      res.end( html );
    });
  }
).listen( 8000 );*/

var connect = require( 'connect' );
var fs = require( 'fs' );

connect(
  connect.static( __dirname + '/public' ),
  connect.bodyParser(),
  function( req, res ) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = firstName + ' ' + lastName;
    var stream;

    if ( firstName || lastName ) {
      //create a stream, and create the file if it doesn't exist
      stream = fs.createWriteStream( 'public/data/user_name.txt' );
    } else {
      return;
    }

    stream.on( 'open', function() {
      // write to and close the stream at the same time
      stream.end( (firstName + ',' + lastName + '\n'), 'utf-8' );

      var html = '<!doctype html>' +
        '<html><head><title>Hello ' + userName + '</title></head>' +
        '<body><h1>Hello, ' + userName + '!</h1></body></html>';
      res.end( html );
    });
  }
).listen( 8000 );