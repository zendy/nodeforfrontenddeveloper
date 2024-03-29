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

/*var connect = require( 'connect' );
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
).listen( 8000 );*/

/*var http = require( 'http' );
var fs = require( 'fs' );
var querystring = require( 'querystring' );

http.createServer(function ( req, res ) {
  var data = '';

  // serve static form
  if ( req.method == 'GET' ) {
    getFile( __dirname + '/public/simpleForm.html', res );
  }

  // handle form post
  if ( req.method == 'POST' ) {
    req.on( 'data', function( chunk ) {
      // append received data
      data += chunk;
    });

    req.on( 'end', function() {
      // get key/value pairs from received data
      var params = querystring.parse( data );
      var userName = params.firstName + ' ' + params.lastName;
      var html = '<!doctype html>' +
          '<html><head><title>Hello ' + userName + '</title></head>' +
          '<body><h1>Hello, ' + userName + '!</h1></body></html>';
      res.end( html );
    });
  }
}).listen( 8000 );

function getFile( localPath, res ) {
  // read the file in and return it, or return a 500 if it can't be read
  fs.readFile( localPath, function( err, contents ) {
    if ( !err ) {
      res.writeHead( 200, {
        'Content-Type': 'text/html',
        'Content-Length': contents.length
      });
      res.end( contents );
    }
    else {
      res.writeHead( 500 );
      res.end();
    }
  });
}*/

/*var connect = require( 'connect' );

connect(
  connect.static( __dirname + '/public' ),
  connect.bodyParser(),
  function( req, res ){
    var userName = req.body.firstName + ' ' + req.body.lastName;
    var html = '<!doctype html>' +
        '<html><head><title>Hello ' + userName + '</title></head>' +
        '<body><h1>Hello, ' + userName + '!</h1></body></html>';

    res.end( html );
  }
).listen( 8000 );*/

/*var http = require( 'http' );
var querystring = require( 'querystring' );

http.createServer(function( req, res ) {
  var qs = querystring.parse( req.url.split( '?' )[1] );
  var username = qs.firstName + ' ' + qs.lastName;
  var json;

  if ( qs.callback ) {
    //if we have a callback function name, do JSONP
    json = qs.callback + "({username:'" + username + "'});";
  } else {
    // otherwise, just return JSON
    json = JSON.stringify( {'username': username} );
  }

  res.writeHead( 200, {
    // change MIME type to JSON
    'Content-Type': 'application/json',
    'Content-Length': json.length
  });

  res.end( json );
}).listen( 8000 );*/

var connect = require( 'connect' );
// create socket.io server on port 1337
var io = require( 'socket.io' ).listen( 1337 );

connect( connect.static( __dirname + '/public' ) ).listen( 8000 );

// listen for connection from an individual client
io.sockets.on( 'connection', function( socket ) {
  // listen for setName event
  socket.on( 'setName', function( data ) {
    var userName = data.firstName + ' ' + data.lastName;
    // publish nameSet event with new username
    socket.emit( 'nameSet' , {userName: userName});
  });
});